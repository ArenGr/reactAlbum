import {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "bootstrap/dist/css/bootstrap.min.css";

const styles = theme => ({
    root: {
        maxWidth: 345,
    },
});

class App extends Component{
    state = {
        images: [],
        showFirsts: true,
        showLasts: false
    };
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    images: data,
                })
            });
    }

    showLasts = ()=>{
         this.setState({showFirsts: false});
         this.setState({showLasts: true});
    }

    render(){
        const { classes } = this.props;
        var firsts = [];
        var others = [] ;
        this.state.images.map(function(items, i) {
            if (i%50==0) {
                firsts.push( <div className="col-sm-4 d-flex justify-content-center mt-3">
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={`this is img of ${ items.albumId }` }
                                height="140"
                                image={items.url}
                                title={items.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {items.title}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Album {items.albumId}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Button size="small" color="primary">
                        Load More
                    </Button>
                </div>);
            }else{
                others.push( <div className="col-sm-4 d-flex justify-content-center mt-3">
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={`this is img of ${ items.albumId }` }
                                height="140"
                                image={items.url}
                                title={items.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {items.title}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Album {items.albumId}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Button size="small" color="primary">
                        Load More
                    </Button>
                </div>
                );
            }
        })

        var content;
        if (this.state.showFirsts) {
           content = firsts; 
        }else{
           content = others; 
        }
        return (
            <div className="row mt-5 ">
                {
                    content
                }
            </div>
        );
    }
}
App.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles) (App);
