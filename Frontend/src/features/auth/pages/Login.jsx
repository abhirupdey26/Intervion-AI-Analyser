import React,{useState} from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { user, loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleLogin({email,password})
        if (success) {
            navigate('/')
        }
    }

    if (user) {
        return <Navigate to='/' replace />
    }

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }


    return (
        <main>
            <div className="form-container">
                <div className='auth-header'>
                    <span className='auth-chip'>Secure access</span>
                    <h1>Welcome to Intervion AI Analyser</h1>
                    <p>Sign in to unlock personalized interview strategy, resume polish, and AI-backed question prep.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>
                    <button className='button primary-button auth-submit-btn' disabled={loading}>
                        {loading && <span className='button-spinner' aria-hidden='true' />}
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                </form>
                <p className='auth-footer-text'>Don't have an account? <Link to={'/register'}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login