import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PageLayout from "parts/PageLayout";
import { UserContext } from "services/user";
import { Box, Container, Checkbox, Heading, SimpleGrid, Input, Text, Button } from "@chakra-ui/react";

const UserSignupPage = () => {
    const { user, patchUserFromAPI } = useContext(UserContext); 
    const [formData, setFormData] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        const id = event.target.id;
        let value;
        event.target.type === 'checkbox' ? value = event.target.checked : value = event.target.value;
        
        setFormData({...formData, [id]: value});
    }

    const handleFileUpload = () => {
        const selectedFile = document.getElementById('upload').files[0]
        console.log(selectedFile)
        setFormData({...formData, "picture": selectedFile})
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const handleSkipClick= () => {
        history.push("/workbooks");
    };

    const handleSubmit = async () => {
        // alert(JSON.stringify(formData));
        console.log(formData)
        await patchUserFromAPI(formData);
        console.log('the saved user?', user)
    };

    return (
        <PageLayout navMargin={false}>
            <Container boxShadow="dark-lg" background="white" padding="50px" maxW="3xl" centerContent>
                <Heading paddingBottom="40px" textTransform="uppercase" as="h2" size="2xl">Welcome!</Heading>
                <Text paddingBottom="25px">We'd love to know a bit about you.</Text>
                <SimpleGrid columns={2} spacingX="40px" spacingY="20px">

                    <Box align="right" paddingTop="8px">Name</Box>
                    <Input id="name" variant="flushed" onChange={handleChange}/>

                    <Box align="right" paddingTop="8px">Organization</Box>
                    <Input id="company" variant="flushed" onChange={handleChange}/>

                    <Box align="right" paddingTop="8px">Location</Box>
                    <Input id="location" variant="flushed" onChange={handleChange}/>

                    <Box align="right" paddingTop="8px">Profile Picture</Box>
                    <input type="file" id="upload" multiple onChange={handleFileUpload}/>

                    <Box align="right" paddingTop="8px">What space are you working in?</Box>
                    <SimpleGrid columns={2} spacingX="40px" spacingY="10px">

                        <Checkbox id="cb-researcher">Researcher</Checkbox>

                        <Checkbox id="cb-investor">Investor</Checkbox>

                        <Checkbox id="cb-policymaker">Policymaker</Checkbox>

                        <Checkbox id="cb-other">Other</Checkbox>

                        <Checkbox id="cb-student">Student</Checkbox>

                    </SimpleGrid>
                    <Box align="right" paddingTop="8px">
                        <Checkbox id="cb-accept-terms"></Checkbox>
                    </Box>
                    <Box paddingTop="3px">
                        I accept the terms and conditions as detailed in the ...
                    </Box>
                    <Box></Box>
                    <Box>
                        <Button 
                            color="grey" 
                            variant="link" 
                            onClick={handleSkipClick}
                        >
                        Skip
                        </Button>
                        <Button 
                            color="white" 
                            background="#00477D" 
                            padding="25px 40px" 
                            marginLeft="20px"
                            onClick={handleSubmit}
                        >
                        Finish account setup
                        </Button>
                    </Box>
                </SimpleGrid> 
                </Container>
        </PageLayout>
    )
}

export default UserSignupPage;
