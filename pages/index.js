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
