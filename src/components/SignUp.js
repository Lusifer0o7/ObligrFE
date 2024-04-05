import * as React from "react";
import { useState, useEffect, Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const steps = ["Create Account", "Verify Email", "Verify Phone Number"];

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [dispatch, error, alert, isAuthenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(user));
  };

  // Stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 7,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
              <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                Sign in
              </Typography>
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                      );
                    }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{ mt: 1 }}
                    >
                      {activeStep === 0 ? (
                        <>
                          <Box>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="name"
                              type="name"
                              label="Name"
                              name="name"
                              autoComplete="name"
                              autoFocus
                              value={user.name}
                              onChange={registerDataChange}
                            />

                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              type="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              autoFocus
                              value={user.email}
                              onChange={registerDataChange}
                            />

                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="address"
                              type="location"
                              label="Address"
                              name="address"
                              autoComplete="location"
                              autoFocus
                              value={user.address}
                              onChange={registerDataChange}
                            />

                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              value={user.password}
                              onChange={registerDataChange}
                            />
                          </Box>

                          <Grid container>
                            <Grid item xs>
                              <Link href="#" variant="body2">
                                Forgot password?
                              </Link>
                            </Grid>
                            <Grid item>
                              <Link href="/login" variant="body2">
                                {"Already have an account? Login"}
                              </Link>
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        ""
                      )}

                      {activeStep === 1 ? (
                        <>
                          <Box>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="emailotp"
                              type="number"
                              label="OTP"
                              name="emailotp"
                              autoComplete="name"
                              autoFocus
                              onChange={registerDataChange}
                            />
                          </Box>
                        </>
                      ) : (
                        ""
                      )}

                      {activeStep === 2 ? (
                        <>
                          <Box>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="phoneotp"
                              type="number"
                              label="OTP"
                              name="phoneotp"
                              autoComplete="name"
                              autoFocus
                              onChange={registerDataChange}
                            />

                            <FormControlLabel
                              control={
                                <Checkbox value="remember" color="primary" />
                              }
                              label="Remember me"
                            />
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2, background: "#640062" }}
                            >
                              Sign In
                            </Button>
                          </Box>
                        </>
                      ) : (
                        ""
                      )}
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      {isStepOptional(activeStep) && (
                        <Button
                          color="inherit"
                          onClick={handleSkip}
                          sx={{ mr: 1 }}
                        >
                          Skip
                        </Button>
                      )}

                      <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
}
