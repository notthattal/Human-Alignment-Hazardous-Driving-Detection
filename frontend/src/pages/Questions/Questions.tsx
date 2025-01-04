import React, { useState } from "react";
import { QuestionsFormData, QuestionsProps } from "../../utils/interfaces";
import { Button, Col, Form, Row } from "react-bootstrap";
import styles from './Questions.module.css'

const Questions: React.FC<QuestionsProps> = ({ onFormSumbitted }) => {

    const [formData, setFormData] = useState<QuestionsFormData>({
        dangerLevel: 0
    })

    const handleSubmit = () => {
        if (onFormSumbitted) {
            onFormSumbitted();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        let updatedValue: any;

        if (type === 'checkbox') {
            updatedValue = (e.target as HTMLInputElement).checked;
        } else {
            updatedValue = value;
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: updatedValue,
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerWrapper}>
                <div className={styles.title}>
                    Post-Simulation Survey
                </div>
                <div className={styles.content}>
                    Please answer the following questions 
                </div>
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-4' controlId="formGridDanger" >
                            <Form.Label>On a scale of 1-10, how dangerous was the situation? (1 = not dangerous at all, 10 = extremely dangerous</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="moderate"
                                name="dangerLevel"
                                value={formData.dangerLevel}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button className='mb-4' variant="dark" type="submit" style={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Questions;