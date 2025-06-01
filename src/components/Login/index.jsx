import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useFetchData } from "../../lib/useFetchData"

import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Stack,
    Alert
} from "@mui/material"

const Login = () => {
    const navigate = useNavigate()

    const fetchData = useFetchData()

    const location = useLocation()
    const from = location.state?.from

    const [formData, setFormData] = useState({
        loginName: '',
        password: '',
        loginNameError: null,
        passwordError: null,
    })

    const [loginError, setLoginError] = useState(null)

    const handleChange = (e) => {
        const field = e.target
        setFormData(old => ({ ...old, [field.name]: field.value, [field.name + 'Error']: null }))
    }

    const handleBlur = (e) => {
        const field = e.target
        const fieldError = field.name + "Error"
        if (!field.value) {
            setFormData(old => ({ ...old, [fieldError]: `${field.name} is required` }))
        } else {
            setFormData(old => ({ ...old, [fieldError]: null }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoginError(false)

        const loginName = formData.loginName.trim()
        const password = formData.password.trim()

        let hasError = false
        const updatedErrors = {}

        for(const key in formData){
            if(!key.endsWith('Error'))
                continue

            const inputFieldName = key.slice(0, -5)            
            if(!formData[inputFieldName]){
                hasError = true
                updatedErrors[key] = `${inputFieldName} is required`
            }
        }

        if (hasError) {
            setFormData(old => ({ ...old, ...updatedErrors }))
            return
        }

        const option = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
            body: JSON.stringify({ loginName, password })
        }

        await fetchData({
            endpoint: '/admin/login',
            option: option,
            success: (json) => {
                localStorage.setItem('accessToken', json.token)
                localStorage.setItem('userId', json.userId)
                navigate(from || '/')
            },
            error: setLoginError
        })
    }

    return (
        <Container maxWidth="xs" fullWidth>
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                mt: 8,
                p: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: "background.paper"
            }}
        >
            <Stack spacing={2}>
            <Typography variant="h5" align="center">
                Login
            </Typography>

            <TextField
                label="Login Name"
                name="loginName"
                value={formData.loginName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formData.loginNameError)}
                helperText={formData.loginNameError || ""}
                fullWidth
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(formData.passwordError)}
                helperText={formData.passwordError || ""}
                fullWidth
            />

            {loginError && (
                <Alert severity="error" variant="outlined">
                {loginError}
                </Alert>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>

            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate("/register", {state: {from}})}
            >
                Register
            </Button>

            </Stack>
        </Box>
        </Container>
    )
}

export default Login
