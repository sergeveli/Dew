import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SplashPage from "./components/SplashPage";
// import Clock from "./components/clock";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";



function App() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

// const [timerDays, setTimerDays] = useState();
// const [timerHours, setTimerHours] = useState();
// const [timerMinutes, setTimerMinutes] = useState();
// const [timerSeconds, setTimerSeconds] = useState();

// let interval;

// const startTimer=()=>{
//   const countdownDate = new Date('October 31,2022').getTime();

//   interval = setInterval(()=>{
//     const now = new Date().getTime();

//     const distance = countdownDate - now;

//     const days=Math.floor(distance/(24*60*60*1000));

//     const hours=Math.floor(
//       (distance % (24*60*60*1000))/(1000*60*60)
//     );
//     const minutes=Math.floor((distance % (60*60*1000)
//     )/(1000*60));

//     const seconds=Math.floor((distance % (60*1000)) / 
//     1000);

//     if(distance<0){
//       clearInterval(interval.current)
//     } else {
//       setTimerDays(days);
//       setTimerHours(hours);
//       setTimerMinutes(minutes);
//       setTimerSeconds(seconds);
//     }
//   })
// }

// useEffect(()=>{
//   startTimer();
// });


  return (
    <DndProvider backend={HTML5Backend}>
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <PrivateRoute path='/home'>
            {/* <Clock timerDays={timerDays} timerHours={timerHours} 
                  timerMinutes={timerMinutes} timerSeconds={timerSeconds}/> */}
            <HomePage user={user}/>
          </PrivateRoute>

          <Route path='/'>
            {user ?
            <Redirect to={{pathname: "/home"}}/> :
            <SplashPage />
            }
          </Route>
        </Switch>
      )}
    </>
    </DndProvider>
  );
}

function PrivateRoute({ children, ...rest }) {
  const user = useSelector(state => state.session.user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;