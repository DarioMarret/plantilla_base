import React, { useEffect, useState } from "react";
import useAuth from "../../hook/useAuth";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import { getDatosUsuario, setDatosUsuario } from "../../function/localstore/storeUsuario";
import axios from "axios";
import { useRouter } from 'next/router';

function Login() {
  const router = useRouter()
	React.useEffect(() => {
		let user = getDatosUsuario()
		if(user != null){
			router.push("/admin/dashboard")
		}
	}, [])
  
  const { login, setReloadUser } = useAuth();
  const [user, setuser] = useState({
    username:null,
    password:null,
  });
  
  const AuthValivation=async()=>{
    if(user.username !== null && user.password !== null){
      const { data } = await axios.post('/api/login',user)
      if(data.success){
        setDatosUsuario(data)
        login(data)
        setReloadUser(data.success)
      }
    }
  }

  const handelChange = (e)=>{
    setuser({
      ...user,
      [e.target.name]:e.target.value
    })
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Login</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={(e)=>handelChange(e)}
                    name="username"
                    placeholder="username"
                    password
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={(e)=>handelChange(e)}
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={() =>AuthValivation()}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

// export const getServerSideProps = async(context) => {
//   const session = await getSession(context);
//   return {
//     props:{
//       session: session,
//     }
//   }
// }

Login.layout = Auth;

export default Login;