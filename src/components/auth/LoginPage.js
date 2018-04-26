import React from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import { connect } from "react-redux";
import * as actions from "../../actions";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.widget = new OktaSignIn({
      baseUrl: "https://dev-842835.oktapreview.com",
      clientId: "0oaeszy1axIjhc08c0h7",
      logo:
        "http://www.perfectfitcomputers.ca/wp-content/uploads/2014/08/aviato-logo.svg",
      redirectUri:
        "http://ec2-34-217-31-45.us-west-2.compute.amazonaws.com:3000",
      authParams: {
        responseType: "id_token"
      }
    });

    this.showLogin = this.showLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.setOktaSession = this.setOktaSession.bind(this);
  }

  componentDidMount() {
    if (!this.props.auth && window.location.href === "/login") {
      this.setOktaSession();
    }
  }

  setOktaSession() {
    this.widget.session.get(response => {
      if (response.status !== "INACTIVE") {
        this.props.setOktaUser(response);
        window.location.href = "/";
      } else {
        this.showLogin();
      }
    });
  }

  showLogin() {
    this.widget.renderEl(
      { el: this.loginContainer },
      response => {
        this.setOktaSession();
      },
      err => {
        console.log(err);
      }
    );
  }

  logout() {
    this.widget.signOut(() => {
      this.props.setOktaUser();

      this.showLogin();
    });
  }

  render() {
    return (
      <div>
        {!this.props.auth ? (
          <div
            ref={div => {
              this.loginContainer = div;
            }}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(LoginPage);
