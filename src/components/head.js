import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';
import HowToReg from '@material-ui/icons/HowToReg';

export default class Head extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { toggleView, handleToggleView } = this.props;
        return (
            <Box style={{
                position: 'relative',
                height: '50px',
                width: '300px',
                marginBottom: '5px',
              }}>
                <Tooltip title={toggleView ? "No Account? Sign Up now!" : "Already have an account? Sign In now!"}>
                  <IconButton onClick={handleToggleView}>
                    {
                      toggleView ? (
                        <PersonAdd style={{fontSize: '30px'}} />
                      ) : (
                        <HowToReg style={{fontSize: '30px'}} />
                      )
                    }
                  </IconButton>
                </Tooltip>
              </Box>
        )
    }
}