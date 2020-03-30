import React, { Component } from 'react';
import axios from 'axios'
import  userImage1 from "../user1.png"
import "../App.css"
export default class CreateUsers extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.onSubmit = this.onSubmit.bind(this)
        this.checkError = this.checkError.bind(this)
        this.state = {
            username: '',
            error:{
             
            }


        }
    }

    onChangeUsername(e) {
    const name=e.target.name;
    const value=e.target.value;
    this.setState({
        [name]:value
    },()=>{
        this.checkError(name)
    })
console.log({[name]:value})
    }


    checkError(name){
        var message = '';
        switch(name){
            case"username":
            if (this.state[name].length<=3) {
              message = "First name is required";
            
            }else {
                if (!this.state[name].match('^[a-zA-Z\\s.]*$')) {
                    message = "First name should be in alphabets";
                }
            }
            break;
            default:
                message=""
               
              
            }
            var errorMsg = this.state.error;
            errorMsg[name] = message;
            this.setState({
                error: errorMsg
            })
            return message;
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,

        }

        console.log(user)


        axios.post("http://localhost:5000/user/add", user)
            .then(res => alert(res.data))



        this.setState({
            username: ''
        })
    }


    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <img src={userImage1} className="img"></img>
                </div>
                <div className="col-6 offset-3">
                <h3>Create User Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>UserName:</label>
                        <input type="text"
                         autoComplete="off"
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername} 
                            required/>
                            <span className="error">{this.state.error.username}</span>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="bt btn-primary" />

                    </div>
                </form>
                </div>
            </div>
        )
    }
}