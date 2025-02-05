import styles from './SignInPage.module.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import { SignInFormData } from '../../utils/types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSignIn from '../../hooks/useSignIn';
import { Container } from 'react-bootstrap';

const SignInPage: React.FC = () => {
    const { signIn } = useSignIn();
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsScreenTooSmall(window.innerWidth < 1200);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

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

    if (isScreenTooSmall) {
        return (
            <Container fluid className="vh-100">
                <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center p-4">
                    <h1 className={`${styles.title} mb-4 text-center`}>Screen Size Too Small</h1>
                    <p className="mb-3">
                        For the best experience, please either:
                    </p>
                    <ul className="list-unstyled">
                        <li>Increase your window size</li>
                        <li>- or -</li>
                        <li>Use a device with a larger screen</li>
                    </ul>
                    <p className="mt-3 fw-bold">
                        Minimum recommended width: 1200px
                    </p>
                </div>
            </Container>
        );
    }

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                {/* First Column */}
                <Col
                    md={6}
                    className="d-flex flex-column justify-content-center align-items-center px-5">
                    <div style={{ maxWidth: '650px' }}>
                        <h1 className={`${styles.title} mb-4 text-center`}>
                            Welcome to the Human-Aligned Hazard Detection Survey.
                        </h1>
                        <p className={`${styles.content} mb-4 text-center`}>
                            Human Aligned Hazardous Detection (HAHD) is a research initiative aimed at making driving behavior in autonomous systems more aligned with human decision-making.
                        </p>
                    </div>
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
                <Col md={6} className="bg-dark text-white d-flex justify-content-center align-items-center">
                    <h1 className="text-center">A chance to win $100 for every video submitted!</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default SignInPage;