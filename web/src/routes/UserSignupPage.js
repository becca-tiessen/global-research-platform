import React from "react";
import { useHistory } from "react-router-dom";
import PageLayout from "parts/PageLayout";
import { Box, Container, Checkbox, Heading, SimpleGrid, Input, Text, Button } from "@chakra-ui/react";

const UserSignupPage = () => {
    const history = useHistory();

    const handleSkipClick= () => {
        history.push("/workbooks");
    };

    const handleSubmit = () => {
        alert('hi!')
    };

    return (
        <PageLayout navMargin={false}>
            <Container maxW="3xl" centerContent>
                <Heading textTransform="uppercase" as="h2" size="2xl">Welcome!</Heading>
                <Text>We'd love to know a bit about you.</Text>
                <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
                    <Box align="right" paddingTop="8px">Name</Box>
                    <Input variant="flushed"/>
                    <Box align="right" paddingTop="8px">Organization</Box>
                    <Input variant="flushed"/>
                    <Box align="right" paddingTop="8px">Title</Box>
                    <Input variant="flushed" />
                    <Box align="right" paddingTop="8px">Role</Box>
                    <Input variant="flushed" />
                    <Box align="right" paddingTop="8px">What space are you working in?</Box>
                    <SimpleGrid columns={2} spacingX="40px" spacingY="10px">
                        <Checkbox>Researcher</Checkbox>
                        <Checkbox>Investor</Checkbox>
                        <Checkbox>Policymaker</Checkbox>
                        <Checkbox>Other</Checkbox>
                        <Checkbox>Student</Checkbox>
                    </SimpleGrid>
                    <Box align="right" paddingTop="8px">
                        <Checkbox></Checkbox>
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
