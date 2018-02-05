/*
    Create by Pierre Marsot on 02/02/2018
*/
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ShareIcon from 'material-ui-icons/Share';
import TextField from 'material-ui/TextField';
import {generateSeed} from '../actions/seed';

const platform = require('platform');

const styles = theme => ({
    root: {
        width: '100%',
    },
    content: {
        width: '50%',
        margin: 'auto',
        textAlign: 'center',
        marginTop: '60px',
    },
    flex: {
        flex: 1,
        textAlign: 'center',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    button: {
        margin: theme.spacing.unit,
    },
    textFieldSeed: {
        margin: '30px',
    }
});

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            seed: '',
            error: '',
        };
    }

    handleGenerateSeed = () => {
        const that = this;
        generateSeed()
            .then((seed) => {
                that.setState({
                    seed,
                });
            })
            .catch((error) => {
                that.setState({
                    error,
                });
            });
    };

    render() {
        const {classes} = this.props;
        const {seed} = this.state;

        let textField = null;

        if (seed && seed.length > 0) {
            textField = <TextField
                id="name"
                label="My seed"
                className={classes.textFieldSeed}
                fullWidth={true}
                value={this.state.seed}
                disabled={true}
                margin="normal"
            />;
        }

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <ShareIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            IOTA Seed Generator
                        </Typography>

                    </Toolbar>
                </AppBar>
                <section className={classes.content}>
                    {textField}
                    <Button
                        variant="raised"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleGenerateSeed}
                    >
                        Generate a truly seed
                    </Button>
                </section>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);