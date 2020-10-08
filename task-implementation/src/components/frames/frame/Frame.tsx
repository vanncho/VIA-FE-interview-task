import React, { Component } from 'react';

import SupportMember from '../../../models/SupportMember';
import { SupportMemberStatus } from '../../../enumerations/SupportMemberStatus';

import frameStyles from './frame.module.css';
import iconAvailable from '../../../assets/icon-available.svg';
import iconBusy from '../../../assets/icon-busy.svg';
import noAvatar from '../../../assets/no_avatar.jpg';

import { PHONE_REGEX_MATCH } from '../../../constants/constants';

interface FrameProps {
  member: SupportMember;
};

interface FrameState {
  member: SupportMember;
  hovered: boolean;
  imageClass: string;
  statusClass: string;
  frameContentWrapperClass: string;
  interval: number;
  showToolTip: boolean;
};

class Frame extends Component<FrameProps, FrameState> {

  state = {
    member: {
      firstName: '',
      lastName: '',
      available: false,
      phone: '',
      email: '',
      image: '',
      location: ''
    },
    hovered: false,
    imageClass: 'image',
    statusClass: 'status',
    frameContentWrapperClass: 'frameContentWrapper',
    interval: 300,
    showToolTip: false
  };

  intervalID: ReturnType<typeof setTimeout> = setTimeout(() => {}, 0);

  componentDidMount(): void {

    if (this.props.member) {
      this.setState({ member: this.props.member });
    }
  }

  componentWillUnmount(): void {
    
    clearInterval(this.intervalID);
  }

  handleMouseEnter = (): void => {

    this.setState({
      imageClass: 'imageHover',
      statusClass: 'statusMove',
      frameContentWrapperClass: 'frameContentWrapperHovered'
    });

    this.intervalID = setTimeout(() => this.changeHovered(true), this.state.interval);
  }

  changeHovered = (isHovered: boolean): void => {

    this.setState({ hovered: isHovered });
  }

  handleMouseLeave = (): void => {

    this.setState({
      imageClass: 'image',
      statusClass: 'status',
      frameContentWrapperClass: 'frameContentWrapper'
    });

    this.intervalID = setTimeout(() => this.changeHovered(false), this.state.interval);
  }

  correctEmailLetters = (email: string): string => {

    return email.toLowerCase();
  }

  extractPhoneNumber = (phone: string): string => {

    const phoneRegex: RegExp = PHONE_REGEX_MATCH;
    const matchingArray: RegExpExecArray | null = phoneRegex.exec(phone);

    if (matchingArray && matchingArray[2] && matchingArray[3] && matchingArray[4]) {

      return `+${matchingArray[2]} ${matchingArray[3]} ${matchingArray[4]}`;
    }

    return phone;
  }

  handleTooltipHover = (): void => {

    this.setState({ showToolTip: !this.state.showToolTip });
  }

  render() {

    const available: string = this.state.member.available ? SupportMemberStatus.AVAILABLE : SupportMemberStatus.BUSY;

    return (
      <div className={ frameStyles.frameWrapper } onMouseEnter={ this.handleMouseEnter } onMouseLeave={ this.handleMouseLeave }>
        <div className={ frameStyles.imageWrapper }>
          <img
            src={ this.state.member.image ? this.state.member.image : noAvatar }
            alt={ this.state.member.firstName + '' + this.state.member.lastName }
            className={ frameStyles[this.state.imageClass] }
          />
          <img
            src={ this.state.member.available ? iconAvailable : iconBusy }
            alt={ available }
            className={ frameStyles[this.state.statusClass] }
            onMouseEnter={ this.handleTooltipHover }
            onMouseLeave={ this.handleTooltipHover }
          />
          { this.state.showToolTip &&
            <div className={ frameStyles.toolTip }>{ available }</div>
          }
        </div>

        <div className={ frameStyles[this.state.frameContentWrapperClass] }>
          <div className={ frameStyles.frameContent }>
            <p className={ frameStyles.memberName }>{ this.state.member.firstName } { this.state.member.lastName }</p>
            <p className={ frameStyles.memberLocation }>{ this.state.member.location }</p>
          </div>
          { this.state.hovered &&
            <div className={ frameStyles.frameContact }>
              <div className={ frameStyles.phoneWrapper }>
                <p>phone:</p><p>{ this.extractPhoneNumber(this.state.member.phone) }</p>
              </div>
              <div className={ frameStyles.emailWrapper }>
                <p>email:</p><p>{ this.correctEmailLetters(this.state.member.email) }</p>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}  

export default Frame;
