import cv2
import numpy as np
import pandas as pd
from pathlib import Path
import torch
from torchvision import transforms
from torch.utils.data import Dataset, DataLoader

class DrivingHazardDataset(Dataset):
    def __init__(self, video_path, gaze_data, frame_interval=0.1, transform=None):
        """
        prepares the video and gaze data for processing
        args:
            video_path (str): path to the 15-second driving simulation video
            gaze_data (pd.DataFrame): dataframe containing gaze tracking data (x, y, time)
            frame_interval (float): time between frame extractions (default 0.1s = 100ms)
            transform: optional transforms to apply to the video frames
        """
        self.video_path = video_path
        self.gaze_data = gaze_data
        self.frame_interval = frame_interval
        self.transform = transform
        
        # setup video capture object to read the video file
        self.cap = cv2.VideoCapture(video_path)
        
        # get basic video properties we'll need later
        self.fps = self.cap.get(cv2.CAP_PROP_FPS)  # frames per second of the video
        self.total_frames = int(self.cap.get(cv2.CAP_PROP_FRAME_COUNT))  # total number of frames
        
        # figure out which frames we want to extract based on our interval
        self.frame_indices = self._calculate_frame_indices()
        
        # clean up video capture object
        self.cap.release()

    def _calculate_frame_indices(self):
        """
        determines which frames to extract from the video
        
        for a 15-second video at 0.1s intervals, this will give us 150 frames
        we use this instead of taking every frame to reduce redundancy and 
        match our gaze data sampling rate
        """
        # calculate total video duration in seconds
        video_duration = self.total_frames / self.fps
        
        # calculate how many samples we'll take based on our interval
        num_samples = int(video_duration / self.frame_interval)
        
        # create list of frame indices to extract
        # multiply by fps to convert from seconds to frame numbers
        return [int(i * self.frame_interval * self.fps) for i in range(num_samples)]

    def _get_gaze_features(self, frame_time):
        """
        gets the gaze data corresponding to a specific frame time
        
        args:
            frame_time (float): timestamp of the current frame
            
        returns:
            numpy array: gaze features [x, y] for this frame
            
        note: we find the closest gaze sample to our frame time since
        gaze data might not align perfectly with frame times
        """
        # find the gaze sample closest to our frame time
        closest_idx = (self.gaze_data['time'] - frame_time).abs().argmin()
        closest_gaze = self.gaze_data.iloc[closest_idx]
        
        # extract x and y coordinates
        gaze_x = closest_gaze['x']
        gaze_y = closest_gaze['y']
        
        return np.array([gaze_x, gaze_y])

    def __len__(self):
        """
        returns the total number of samples in our dataset
        for a 15-second video at 0.1s intervals, this will be 150
        """
        return len(self.frame_indices)

    def __getitem__(self, idx):
        """
        retrieves a single sample from our dataset
        
        args:
            idx (int): index of the sample to retrieve
            
        returns:
            dict containing:
                - frame: the video frame as a tensor
                - gaze_features: corresponding gaze coordinates
                - timestamp: when this frame occurred in the video
        """
        # open video file and jump to the frame we want
        cap = cv2.VideoCapture(self.video_path)
        frame_idx = self.frame_indices[idx]
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        
        # read the frame
        ret, frame = cap.read()
        cap.release()
        
        # make sure we successfully got the frame
        if not ret:
            raise ValueError(f"couldn't read frame {frame_idx}")
        
        # opencv reads in BGR format, but we want RGB for our model
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # apply any image transformations if specified
        if self.transform:
            frame = self.transform(frame)
        
        # calculate when this frame occurred in the video
        frame_time = frame_idx / self.fps
        
        # get the corresponding gaze data
        gaze_features = self._get_gaze_features(frame_time)
        
        return {
            'frame': frame,
            'gaze_features': gaze_features,
            'timestamp': frame_time
        }

def prepare_dataset(video_path, gaze_data_path, frame_size=(224, 224)):
    """
    sets up the complete dataset for training
    
    args:
        video_path (str): path to the driving simulation video
        gaze_data_path (str): path to csv file with gaze tracking data
        frame_size (tuple): size to resize frames to (default 224x224 for standard models)
    """
    # load our gaze tracking data from csv
    gaze_data = pd.read_csv(gaze_data_path)
    
    # setup image transformations
    # these prepare our frames for standard deep learning models
    transform = transforms.Compose([
        transforms.ToPILImage(),  # convert to PIL image format
        transforms.Resize(frame_size),  # resize to consistent size
        transforms.ToTensor(),  # convert to tensor
        # normalize using imagenet means and stds (standard practice)
        transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                           std=[0.229, 0.224, 0.225])
    ])
    
    # create our dataset object
    dataset = DrivingHazardDataset(
        video_path=video_path,
        gaze_data=gaze_data,
        frame_interval=0.1,  # extract frame every 100ms
        transform=transform
    )
    
    # wrap dataset in dataloader for batch processing
    dataloader = DataLoader(
        dataset,
        batch_size=32,  # process 32 frames at a time
        shuffle=True,   # randomize order for training
        num_workers=4   # use 4 cpu cores for loading data
    )
    
    return dataloader

# example of how to use this code
if __name__ == "__main__":
    # paths to your data files
    video_path = "driving_video.mp4"
    gaze_data_path = "gaze_data.csv"
    
    # gaze_data.csv should have columns: time,x,y
    # example format:
    # time,x,y
    # 0.0,320,240
    # 0.1,322,238
    # 0.2,318,242
    
    # create our data loader
    dataloader = prepare_dataset(video_path, gaze_data_path)
    
    # example of processing one batch of data
    for batch in dataloader:
        frames = batch['frame']           # shape: (batch_size, 3, 224, 224)
        gaze = batch['gaze_features']     # shape: (batch_size, 2)
        timestamps = batch['timestamp']    # shape: (batch_size,)
        
        # this is where you'd feed the batch into your model
        break  # just process one batch for this example
