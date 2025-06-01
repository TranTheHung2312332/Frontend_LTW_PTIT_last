import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import fetchData from "../../lib/fetchData"

import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Stack,
    Alert
} from "@mui/material"

const Register = () => {
    const navigate = useNavigate()

    const location = useLocation()
    const from = location?.state?.from

    const [formData, setFormData] = useState({
        loginName: '',
        password: '',
        firstName: '',
        lastName: '',
        location: '',
        occupation: '',
        description: '',
        loginNameError: null,
        passwordError: null,
        firstNameError: null,
        lastNameError: null
    })

    const [registerError, setRegisterError] = useState(null)

    const handleChange = (e) => {
        const field = e.target
        setFormData(old => ({ ...old, [field.name]: field.value, [field.name + 'Error']: null }))
    }

    const handleBlur = (e) => {
        const field = e.target
        const fieldError = field.name + "Error"

        if(!(fieldError in formData)){
            return
        }

        if (!field.value) {
            setFormData(old => ({ ...old, [fieldError]: `${field.name} is required` }))
        } else {
            setFormData(old => ({ ...old, [fieldError]: null }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setRegisterError(false)

        const loginName = formData.loginName.trim()
        const password = formData.password.trim()
        const firstName = formData.firstName.trim()
        const lastName = formData.lastName.trim()

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
            body: JSON.stringify({ 
                loginName, 
                password,
                firstName,
                lastName,
                description: formData.description,
                occupation: formData.occupation,
                location: formData.location 
            })
        }

        await fetchData({
            endpoint: '/user',
            option: option,
            success: (json) => {
                localStorage.setItem('accessToken', json.token)
                localStorage.setItem('userId', json.userId)
                navigate(from || '/')
            },
            error: setRegisterError
        })
    }

    return (
        <Container maxWidth="xs" sx={{ height: '100vh', overflow: 'auto' }} >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    mt: 2,
                    p: 3,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    boxShadow: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h5" align="center">
                        Register
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

                    <TextField
                        label="First name"
                        name="firstName"
                        type="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(formData.firstNameError)}
                        helperText={formData.firstNameError || ""}
                        fullWidth
                    />

                    <TextField
                        label="Last Name"
                        name="lastName"
                        type="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(formData.lastNameError)}
                        helperText={formData.lastNameError || ""}
                        fullWidth
                    />

                    <TextField
                        label="Location"
                        name="location"
                        type="location"
                        value={formData.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                    />

                    <TextField
                        label="Occupation"
                        name="occupation"
                        type="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        name="description"
                        type="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                    />

                    {registerError && (
                        <Alert severity="error" variant="outlined">
                            {registerError}
                        </Alert>
                    )}

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => navigate("/login", {state: {from}})}
                    >
                        Login
                    </Button>

                </Stack>
            </Box>
        </Container>
    )
}

export default Register
