"""
processes eye-tracking data by normalizing gaze coordinates from various screen sizes 
to a standard video resolution (1280x960) while maintaining aspect ratio and accounting 
for letterboxing/pillarboxing offsets. It also filters out low-quality data by removing 
videos where users spent more than 50% of their time looking at the outer 10% of the screen, 
separating the data into two CSV files: one for good quality gaze data (preprocessedAndNormalized.csv) 
and another for filtered out data (badgazedata.csv)

Last Updated Feb 8th
"""

import pandas as pd
import numpy as np
from pathlib import Path

class GazeDataProcessor:
    def __init__(self, input_csv):
        """
        Initialize the gaze data processor
        
        Args:
            input_csv (str): Path to input CSV file
        """
        self.input_csv = input_csv
        self.VIDEO_WIDTH = 1280
        self.VIDEO_HEIGHT = 960
        self.EDGE_THRESHOLD = 0.10  # 10% from edges
        self.df = None
        self.normalized_data = []
        self.bad_gaze_data = []

    def calculate_video_display_size(self, screen_width, screen_height):
        """
        Calculate how the video would be displayed on a given screen size
        while maintaining aspect ratio
        """
        video_aspect = self.VIDEO_WIDTH / self.VIDEO_HEIGHT
        screen_aspect = screen_width / screen_height
        
        if screen_aspect > video_aspect:
            display_height = screen_height
            display_width = display_height * video_aspect
        else:
            display_width = screen_width
            display_height = display_width / video_aspect
            
        x_offset = (screen_width - display_width) / 2
        y_offset = (screen_height - display_height) / 2
        
        return display_width, display_height, x_offset, y_offset

    def is_gaze_at_edge(self, x, y):
        """
        Check if gaze point is in the outer 10% of the video
        """
        edge_x = self.VIDEO_WIDTH * self.EDGE_THRESHOLD
        edge_y = self.VIDEO_HEIGHT * self.EDGE_THRESHOLD
        
        return (x < edge_x or 
                x > self.VIDEO_WIDTH - edge_x or 
                y < edge_y or 
                y > self.VIDEO_HEIGHT - edge_y)

    def check_video_quality(self, video_data):
        """
        Check if more than 50% of gaze points are at the edges
        
        Returns:
            bool: True if video should be kept, False if it should be dropped
        """
        edge_points = video_data.apply(
            lambda row: self.is_gaze_at_edge(row['x'], row['y']), 
            axis=1
        ).sum()
        
        return edge_points / len(video_data) <= 0.5

    def normalize_coordinates(self, row):
        """
        Normalize coordinates for a single row of data
        """
        display_width, display_height, x_offset, y_offset = self.calculate_video_display_size(
            row['width'], row['height']
        )
        
        # Remove the offset from the gaze coordinates
        adjusted_x = row['x'] - x_offset
        adjusted_y = row['y'] - y_offset
        
        # Convert from display coordinates to video coordinates
        video_x = (adjusted_x / display_width) * self.VIDEO_WIDTH
        video_y = (adjusted_y / display_height) * self.VIDEO_HEIGHT
        
        # Clip coordinates to video boundaries
        normalized_x = np.clip(video_x, 0, self.VIDEO_WIDTH)
        normalized_y = np.clip(video_y, 0, self.VIDEO_HEIGHT)
        
        new_row = row.copy()
        
        # Store original values
        new_row['original_x'] = row['x']
        new_row['original_y'] = row['y']
        new_row['original_width'] = row['width']
        new_row['original_height'] = row['height']
        
        # Store display calculations
        new_row['display_width'] = display_width
        new_row['display_height'] = display_height
        new_row['x_offset'] = x_offset
        new_row['y_offset'] = y_offset
        
        # Update coordinates and dimensions
        new_row['x'] = normalized_x
        new_row['y'] = normalized_y
        new_row['width'] = self.VIDEO_WIDTH
        new_row['height'] = self.VIDEO_HEIGHT
        
        # Add normalization metadata
        new_row['normalized_to_width'] = self.VIDEO_WIDTH
        new_row['normalized_to_height'] = self.VIDEO_HEIGHT
        
        return new_row

    def process_data(self):
        """
        Process the gaze data: normalize coordinates and filter bad videos
        """
        print(f"Reading data from {self.input_csv}")
        self.df = pd.read_csv(self.input_csv)
        
        # Group by user and video
        user_video_groups = self.df.groupby(['userId', 'videoId'])
        
        print("Processing and filtering gaze data...")
        total_groups = len(user_video_groups)
        
        for idx, ((user_id, video_id), group_data) in enumerate(user_video_groups):
            if idx % 100 == 0:
                print(f"Processing group {idx}/{total_groups}")
            
            # Normalize coordinates for this group
            normalized_group = [self.normalize_coordinates(row) for _, row in group_data.iterrows()]
            normalized_df = pd.DataFrame(normalized_group)
            
            # Check if this video should be kept or dropped
            if self.check_video_quality(normalized_df):
                self.normalized_data.extend(normalized_group)
            else:
                self.bad_gaze_data.extend(normalized_group)
                print(f"Dropping video {video_id} for user {user_id} due to excessive edge gazing")

    def save_results(self, good_output_csv, bad_output_csv):
        """
        Save the processed data to CSV files
        """
        # Save good data
        good_df = pd.DataFrame(self.normalized_data)
        good_df.to_csv(good_output_csv, index=False)
        
        # Save bad data
        bad_df = pd.DataFrame(self.bad_gaze_data)
        bad_df.to_csv(bad_output_csv, index=False)
        
        # Print summary
        print("\nProcessing Summary:")
        print(f"Total videos processed: {len(self.normalized_data) + len(self.bad_gaze_data)}")
        print(f"Good videos saved to: {good_output_csv}")
        print(f"Videos with good gaze data: {len(self.normalized_data)}")
        print(f"Bad videos saved to: {bad_output_csv}")
        print(f"Videos with excessive edge gazing: {len(self.bad_gaze_data)}")
        
        # Print unique screen sizes
        good_df_screens = len(good_df.groupby(['original_width', 'original_height']))
        print(f"\nUnique screen sizes in good data: {good_df_screens}")
        print(f"All coordinates normalized to: {self.VIDEO_WIDTH}x{self.VIDEO_HEIGHT}")

def main():
    # File paths
    input_csv = "/Users/lennoxanderson/Documents/Research/Human-Alignment-Hazardous-Driving-Detection/final_user_survey_data.csv"
    good_output_csv = "preprocessedAndNormalized.csv"
    bad_output_csv = "badgazedata.csv"
    
    try:
        processor = GazeDataProcessor(input_csv)
        processor.process_data()
        processor.save_results(good_output_csv, bad_output_csv)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()