import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PageLayout from "parts/PageLayout";
import { UserContext } from "services/user";
import { Box, Container, Checkbox, Heading, SimpleGrid, Input, Text, Button } from "@chakra-ui/react";
import { fetchUser } from "api/api";
import { Formik, Form, Field } from "formik";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Textarea,
    VStack,
  } from "@chakra-ui/react";

const UserSignupPage = () => {
    const { user, patchUserFromAPI } = useContext(UserContext); 
    const [formData, setFormData] = useState({});
    const [userAgreed, setUserAgreed] = useState(false);

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

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData])

    const handleSkipClick= () => {
        history.push("/workbooks");
    };

    const handleSubmit = async ({ name, company, location, picture }) => {
        
        console.log("name: ", name);
        console.log("company: ", company);
        console.log("location: ", location);
        console.log("picture: ", picture);

        await patchUserFromAPI({ 
            "name":name,
            "company":company,
            "location":location,
            "picture":picture
        });

        console.log('the saved user?', user)
        // const data = await fetchUser().json();
        // await console.log(JSON.stringify(data));
    };

    const validateUserAgreement = (value) => {
        setUserAgreed(!value);
        let error;
      
        if (!value) {
          error = 'YOUR COMPLIANCE IS REQUIRED';
        }
      
        //...
      
        return error;
      };

    return (
        <PageLayout>
      {/* <Heading as="h1">Cloning Workbook: {currentWorkbook.workbook.name}</Heading> */}
        <Container boxShadow="dark-lg" background="white" padding="50px" maxW="3xl" centerContent>
            <Heading paddingBottom="40px" textTransform="uppercase" as="h2" size="2xl">Welcome!</Heading>
            <Text paddingBottom="25px">We'd love to know a bit about you.</Text>
                <Formik initialValues={{ name: "", company: "", location: "", picture:"" }} onSubmit={handleSubmit}>
                    {props => (
                    <Form>
                        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
                            <Box align="right" paddingTop="8px">Name</Box>
                            <Field name="name">
                                {({ field, form }) => (
                                <FormControl>
                                    
                                    <Input {...field} id="name" placeholder="" variant="flushed" focusBorderColor="#00477D"/>
                                    
                                    {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                                </FormControl>
                                )}
                            </Field>
                        </SimpleGrid> 
                        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
                            <Box align="right" paddingTop="8px">Organization</Box>
                            <Field name="company">
                                {({ field, form }) => (
                                <FormControl>
                                    
                                <Input {...field} id="company" placeholder="" variant="flushed" focusBorderColor="#00477D"/>
                                    
                                    {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                                </FormControl>
                                )}
                            </Field>
                        </SimpleGrid> 
                        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
                            <Box align="right" paddingTop="8px">Location</Box>
                            <Field name="location">
                                {({ field, form }) => (
                                <FormControl>
                                    
                                    <Input {...field} id="location" placeholder="" variant="flushed" focusBorderColor="#00477D"/>
                                    
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                        </SimpleGrid>
                        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
                            <Box align="right" paddingTop="8px">Profile Picture URL</Box>
                            <Field name="picture">
                                {({ field, form }) => (
                                <FormControl>
                                    
                                    <Input {...field} id="location" placeholder="" variant="flushed" focusBorderColor="#00477D"/>
                                    
                                    {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                                </FormControl>
                                )}
                            </Field>
                        </SimpleGrid>
                        <SimpleGrid columns={2} spacingX="40px" spacingY="20px" paddingTop="10px">
                            <Box align="right" paddingTop="8px">What space are you working in?</Box>
                            <SimpleGrid columns={2} spacingX="40px" spacingY="10px" paddingTop="10px">

                                    <Box display="flex">
                                        <label>Researcher</label>
                                        <Box marginLeft="10px"><Field type="checkbox" id="cb-researcher" name="cb-researcher" value="researcher" /></Box>
                                    </Box>
                                    
                                    <Box display="flex">
                                        <label>Investor</label>
                                        <Box marginLeft="10px"><Field type="checkbox" id="cb-investor" name="cb-investor" value="investor"/></Box>
                                    </Box>

                                    <Box display="flex">
                                        <label>Policymaker</label>
                                        <Box marginLeft="10px"><Field type="checkbox" id="cb-policymaker" name="cb-policymaker" value="policymaker"/></Box>
                                    </Box>

                                    <Box display="flex">
                                        <label>Other</label>
                                        <Box marginLeft="10px"><Field type="checkbox" id="cb-other" name="cb-other" value="other"/></Box>
                                    </Box>

                                    <Box display="flex">
                                        <label>Student</label>
                                        <Box marginLeft="10px"><Field type="checkbox" id="cb-student" name="cb-student" value="student"/></Box>
                                    </Box>

                                </SimpleGrid>
                                
                                <Box align="right" paddingTop="8px">
                                    <Field>
                                        {({ field, form, touched }) => (
                                            <FormControl isInvalid={form.errors.userAgreement }>
                                                
                                                <Field type="checkbox" id="cb-user-agreement" name="userAgreement" validate={validateUserAgreement}/>
                                                
                                                <FormErrorMessage>{form.touched.userAgreement && form.errors.userAgreement}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

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
                                        type="submit" 
                                        color="white" 
                                        background="#00477D" 
                                        padding="25px 40px" 
                                        marginLeft="20px"
                                        disabled={userAgreed}
                                        _hover={{
                                            boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.2)"
                                        }}
                                    >
                                    Finish account setup
                                    </Button>
                                </Box>
                        </SimpleGrid>
                        
                    </Form>
                    )}
                </Formik>
            </Container>
    </PageLayout>
  );
    
}

export default UserSignupPage;
