import React, {Component} from 'react';
import styled from 'styled-components';

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    }
};

const isInViewport = function (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

export class InView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: undefined
        }
    }

    componentDidMount() {
        return window.addEventListener('scroll', debounce(this.handleScroll, 16));
    }

    componentWillUnmount() {
        return window.removeEventListener('scroll', debounce(this.handleScroll, 16));
    }

    handleScroll = () => {
        const section = document.getElementById(this.props.id);
        if (isInViewport(section)) {
            this.setState({
                isVisible: true
            });
        }

    };

    render() {
        const {
            children,
            id,
            animate,
            className
        } = this.props;
        const { isVisible } = this.state;

        return (
            <span id={id} className={`${className ? className : ''} ${isVisible ? animate : ""}`}>
                {children}
            </span>
        );
    }
}

const SectionContainer = styled.section`
    background: ${props => (props.color ? props.color : '')};
    padding: ${props => (props.padding ? props.padding : '30px 0')};
    h2 {
        font-family: 'Lobster', cursive;
        font-size: 50px;
        text-align: center;
        margin: 1.5em 0;
        opacity: 0;
    }
    hr {
        opacity: 0;
    }

    p {
        line-height: 1.15em;
        margin-bottom: 2vh;
    }
    
    .slideInLeft {
      > h2 {
        animation: slideInLeft .75s ease both;
      }
    }
    
    @keyframes slideInLeft {
        0% {
            opacity: 0;
            transform: translateX(-300px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    .wrapper {
        margin: 0 auto;
        padding: 0 20px;
        max-width: 1024px;
    }

    .columnHalf {
        display: inline-block;
        width: 50%;
    }

    .flex {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .flipIn {
      > div {
        animation: flipIn .75s ease both;
      }
    }

    @keyframes flipIn {
      from {
        -webkit-transform: perspective(400px) rotateY(90deg);
        transform: perspective(400px) rotateY(90deg);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        opacity: 0; }
      40% {
        -webkit-transform: perspective(400px) rotateY(-20deg);
        transform: perspective(400px) rotateY(-20deg);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in; }
      60% {
        -webkit-transform: perspective(400px) rotateY(10deg);
        transform: perspective(400px) rotateY(10deg);
        opacity: 1; }
      80% {
        -webkit-transform: perspective(400px) rotateY(-5deg);
        transform: perspective(400px) rotateY(5deg); }
      to {
        -webkit-transform: perspective(400px);
        transform: perspective(400px);
        opacity: 1; } }

    @keyframes starsAnimation {
      from {
        transform: translateY(-2000px);
      }
      to {
        transform: translateY(0px);
      }
    }
`;

const Section = ({
    children,
    name,
    color,
    padding,
    noHeader
}) => {

    return (
        <SectionContainer color={color} id={name} padding={padding}>
            { !noHeader ?
                <InView id={name + 'header'} animate={'slideInLeft'}>
                    <h2>{name}</h2>
                </InView>
            : null }
            <div className="wrapper">
                {children}
            </div>
        </SectionContainer>
    );
};

const ColumnThird = styled.div`
  flex: 0 0 33.3333%;
  display: flex;
  margin-bottom: 15px;
  min-height: 36px;
  &.flex-wrap {
    flex-wrap: wrap;
  }
  &.no-pad {
    padding-right: 0;
  }
  &.no-marg {
    margin: 0;
  }
`;

const ColumnHalf = styled(ColumnThird)`
  flex: 0 0 50%;
`;

const ColumnQuarter = styled(ColumnThird)`
  flex: 0 0 25%;
`;

const ColumnTwoThirds = styled(ColumnThird)`
  flex: 0 0 66%;
`;

const ColumnFull = styled(ColumnThird)`
  flex: 0 0 100%;
  padding-right: 0;
`;

export {Section, debounce, ColumnThird, ColumnHalf, ColumnTwoThirds, ColumnFull, ColumnQuarter}