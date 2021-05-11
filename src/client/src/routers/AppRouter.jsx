import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { useDispatch, useSelector } from 'react-redux'
import { startChecking } from '../actions/auth'
import { Spinner } from '../components/ui/Spinner'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { ScheduleScreen } from '../components/screens/ScheduleScreen'
import { DashboardRoutes } from './DashboardRoutes'

export const AppRouter = () => {

    const dispatch = useDispatch()

    const {checking, uid} = useSelector(state => state.auth)

    useEffect(()=> {
        dispatch(startChecking())
    }, [dispatch])

    if (checking){
        return(
            <div style={{display: 'flex', height: '100vh', alignItems: 'center'}}>
                <Spinner size="big"/>
            </div>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/public/schedule/:_id" component={ScheduleScreen}/>
                    <PrivateRoute isAuthenticated={!!uid} path="/dentaltask" component={DashboardRoutes} />
                    <PublicRoute path="/" isAuthenticated={!!uid} component={AuthRouter}/>
                </Switch>
            </div>
        </Router>
    )
}
