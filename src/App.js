
import './App.css';
import app from "./firebase.init";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";



const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('')
  const [registered, setregistered] = useState(false)
  const [name, setname] = useState('')


  const handleName = e => {
    setname(e.target.value)
  }
  const handleEmailonblur = e => {
    setemail(e.target.value)
  };
  const handleRegister = e => {
    setregistered(e.target.checked);
  }
  const handlePasswordonblur = e => {
    setpassword(e.target.value)
  }
  const handleSubmit = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    if (!/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password)) {
      seterror('Password must contain at least one Special Symbol.')
      return;
    }
    setValidated(true);
    seterror('');

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.error(error)
          seterror(error.message)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
          setemail('');
          setpassword('');
          verifyEmail();
          userprofileName();
        })
        .catch(error => {
          console.error(error)
          seterror(error.message)
        })
    }
    e.preventDefault()

  }
  const forgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email sent for forget')
      })
  }
  const userprofileName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('user name')
      })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email verification sent')
      })
  }
  return (
    <div>
      <div className="register w-50 mx-auto mt-3">
        <h2 className="text-success">Please {registered ? 'Login' : 'Register'}!!!</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {!registered && <Form.Group className="mb-3" controlId="">
            <Form.Label>Enter Your Name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="Your name" required />
          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailonblur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordonblur} type="password" placeholder="Password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegister} type="checkbox" label="Allready Registerd?" />
          </Form.Group>
          <Button onClick={forgetPassword} variant="link">Forget Passoword?</Button>
          <p className='text-danger'>{error}</p>


          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
