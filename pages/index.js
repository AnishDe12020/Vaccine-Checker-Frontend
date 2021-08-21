import Head from "next/head"
import { Formik, Form, ErrorMessage } from "formik"
import { Input, Button } from "@chakra-ui/react"

export default function Home() {
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
        onValidate={(errors, values) => {
          if (values.name === "") {
            errors.name = "Please enter your name"
          }
          if (values.age === "") {
            errors.age = "Please enter your age"
          } else if (values.age < 18) {
            errors.age =
              "Only ones 18 or above are eligible for vaccination as of now."
          }

          if (values.email === "") {
            errors.email = "Please enter your email"
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Please enter a valid email"
          }
          if (values.pinCode === "") {
            errors.pinCode = "Please enter your pin code"
          } else if (values.pinCode.length !== 6) {
            errors.pinCode = "Please enter a valid pin code"
          }
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setSubmitting(false)
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder="Your name here"
              name="name"
            />
            <ErrorMessage name="name" />
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.age}
              placeholder="Your age here"
              name="age"
            />
            <ErrorMessage name="age" />
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Your email id here"
              name="email"
            />
            <ErrorMessage name="email" />
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.pinCode}
              placeholder="Your pin code here"
              name="pinCode"
            />
            <ErrorMessage name="pinCode" />

            <Button type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
