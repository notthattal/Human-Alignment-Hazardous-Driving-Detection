import styles from './SignInPage.module.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import { SignInFormData } from '../../utils/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignIn from '../../hooks/useSignIn';
import { Container } from 'react-bootstrap';

const SignInPage: React.FC = () => {
    const { signIn } = useSignIn();
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
    });
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signIn(formData);
        } catch (err) {
            setError('The password or email you entered was incorrect, please try again.')
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                {/* First Column */}
                <Col
                    md={6}
                    className="d-flex flex-column justify-content-center align-items-center px-5">
                    <h1 className={`${styles.title} mb-4 text-center`}>
                        Welcome to the Human-Aligned Hazard Detection Survey.
                    </h1>
                    <p className={`${styles.content} mb-4 text-center`}>
                        Human Aligned Hazardous Detection (HAHD) is a research initiative aimed at making driving behavior in autonomous systems more aligned with human decision-making.
                    </p>

                    <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
                        <Form.Group className="mb-3" controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {error && (
                            <div className="m-4" style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>
                                {error}
                            </div>
                        )}

                        <Button variant="dark" type="submit" className="w-100">
                            Sign In
                        </Button>
                        <p className="mt-3 text-center fst-italic">
                            Don't have an account? <Link to="/registration">Sign up</Link>
                        </p>
                    </Form>
                </Col>

                {/* Second Column */}
                <Col md={6} className="bg-dark" />
            </Row>
        </Container>
    );
};

export default SignInPage;
