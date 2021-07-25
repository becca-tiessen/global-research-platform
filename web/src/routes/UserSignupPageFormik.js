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
        console.log(value);
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
                                    
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                                    
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                                    
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                        </SimpleGrid>
                        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
                            <Box align="right" paddingTop="8px">What space are you working in?</Box>
                            <SimpleGrid columns={2} spacingX="40px" spacingY="10px">

                                    <label>
                                        Researcher
                                        <Field type="checkbox" id="cb-researcher" name="cb-researcher" value="researcher"/>
                                    </label>

                                    <label>
                                        Investor
                                        <Field type="checkbox" id="cb-investor" name="cb-investor" value="investor"/>
                                    </label>

                                    <label>
                                        Policymaker
                                        <Field type="checkbox" id="cb-policymaker" name="cb-policymaker" value="policymaker"/>
                                    </label>

                                    <label>
                                        Other
                                        <Field type="checkbox" id="cb-other" name="cb-other" value="other"/>
                                    </label>

                                    <label>
                                        Student
                                        <Field type="checkbox" id="cb-student" name="cb-student" value="student"/>
                                    </label>

                                </SimpleGrid>
                                <Box align="right" paddingTop="8px">
                                    <Field type="checkbox" id="cb-user-agreement" name="cb-user-agreement" value="userAgreement"/>
                                </Box>
                                <Box paddingTop="3px">
                                    I accept the terms and conditions as detailed in the ...
                                </Box>
                                <Box align="right" paddingTop="8px">
                                    <Field name="userAgreement">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.userAgreement }>
                                                
                                                <Field type="checkbox" id="cb-user-agreement" name="userAgreement" value="userAgreement" validate={validateUserAgreement}/>
                                                
                                                <FormErrorMessage>{form.errors.userAgreement}</FormErrorMessage>
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
