import Head from "next/head"
import { Formik, Form, ErrorMessage } from "formik"
import {
  Input,
  Button,
  Flex,
  Box,
  useToast,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"
import { submitData } from "@/utils/db"

export default function Home() {
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()
  const FormBg = useColorModeValue("gray.100", "gray.900")
  return (
    <div>
      <Head>
        <title>Vaccine Checker</title>
        <meta
          name="description"
          content="A simple application which will notify if any vaccine slots are available according to given information"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Formik
        initialValues={{ name: "", age: "", email: "", pinCode: "" }}
        validate={values => {
          const errors = {}
          if (!values.name) {
            errors.name = "Please enter your name"
          }
          if (!values.name) {
            errors.age = "Please enter your age"
          } else if (values.age < 18) {
            errors.age =
              "Only ones 18 or above are eligible for vaccination as of now."
          }

          if (!values.name) {
            errors.email = "Please enter your email"
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Please enter a valid email"
          }
          if (!values.name) {
            errors.pinCode = "Please enter your pin code"
          } else if (values.pinCode.length !== 6) {
            errors.pinCode = "Please enter a valid pin code"
          }

          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const data = {
            name: values.name,
            age: values.age,
            email: values.email,
            pinCode: values.pinCode,
            time: new Date().toISOString(),
          }

          await submitData(values.email, data)
            .then(() => {
              toast({
                title: "Form successfully submitted",
                description:
                  "Your submission has been recorded. You will receive an email as soon as there is a vaccine slot available for you",
                status: "success",
                duration: 30000,
                isClosable: true,
              })
              values = { name: "", age: "", email: "", pinCode: "" }
            })
            .catch(error => {
              toast({
                title: "An error occured",
                description: error.message,
                status: "error",
                duration: 10000,
                isClosable: true,
              })
            })

          setSubmitting(false)
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Box m={8} p={4} borderRadius={8}>
            <Button m={4} onClick={toggleColorMode}>
              {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            </Button>
            <Form>
              <Flex
                m={4}
                p={4}
                backgroundColor={FormBg}
                flexDirection="column"
                borderRadius={8}
                justifyContent="space-between"
              >
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Your name here"
                  name="name"
                  m={2}
                />
                <ErrorMessage name="name" />
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                  placeholder="Your age here"
                  name="age"
                  m={2}
                />
                <ErrorMessage name="age" />
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Your email id here"
                  name="email"
                  m={2}
                />
                <ErrorMessage name="email" />
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pinCode}
                  placeholder="Your pin code here"
                  name="pinCode"
                  m={2}
                />
                <ErrorMessage name="pinCode" />
              </Flex>
              <Button m={4} p={4} type="submit" isLoading={isSubmitting}>
                Submit
              </Button>
            </Form>
          </Box>
        )}
      </Formik>
    </div>
  )
}
