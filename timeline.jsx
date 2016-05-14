var Timeline = React.createClass({
    getInitialState: function() {
        return {
          junctionArray: ["Progress", "Out", "Processing", "Delivery", "Delivered"],
          borderWidth: 3,
          interval: 100,
          stepsDimension: 10,
          stepsBorder: 3,
          stepsPos : [],
          jumpsStep: 2,
          showLabel: true,
          height: 40,
          currentStatus: 3
        }
    },
    componentWillMount: function(){
        if(this.state.borderWidth > this.state.stepsBorder){
            this.setState({borderWidth: this.state.stepsBorder})
        }
    },
    componentDidMount: function(){
       if(this.state.currentStatus > this.state.junctionArray.length){
            this.state.currentStatus = this.state.junctionArray.length;
          this.setState({currentStatus: this.state.junctionArray.length});
       }
       this._animateTimeline(this.state.interval * this.state.currentStatus - (this.state.stepsBorder));
    },
    _styleSheet: function() {
        return {
            "timelineStyle": {
                    border: this.state.borderWidth + "px solid #E0E0E0"
            },
            "stepPointStyle":{
                    width: this.state.stepsDimension + "px",
                height:this.state.stepsDimension + "px",
                border: this.state.stepsBorder + "px solid #E0E0E0"
            },
            "stepStyle": {
                    width: this.state.interval + "px",
                top: - 1*(this.state.stepsDimension / 2 +(this.state.stepsBorder- this.state.borderWidth) + this.state.borderWidth),
                height: this.state.height + "px"
            },
            "currentStyle": {
                border: this.state.borderWidth +	"px solid #2ED541",
              width: 0
            }
        }
    },
    _animateTimeline: function(location){
      let current = document.getElementsByClassName('current');
      let self = this;
      let interval;
      interval = window.setInterval(function(){
          let xPos = parseInt(current[0].style.width) + self.state.jumpsStep;
          let index = self.state.stepsPos.indexOf(Math.round(xPos));
          if(index != -1){
            $($('.junction-point')[index]).addClass('animate-steps-color');
            $($('.junction-label')[index]).addClass('animate-label-color');
          }
          if(xPos >= location){
                xPos = location;
                window.clearInterval(interval);
            }
          current[0].style.width = xPos + "px";
      },50);
    },
    _plotSteps: function() {
        let junction, self = this;
        junction = this.state.junctionArray.map(function(item, i) {
          let step = self._styleSheet()["stepStyle"];
          step["left"] = self.state.interval*i;
          self.state.stepsPos.push( step["left"] + self.state.interval/2);
          //self.state.stepsPos.push( step["left"] + self.state.interval - self.state.stepsDimension);
            return (
            <li className = 'step' style = {step}>
            <span className = 'junction-point' style={self._styleSheet()["stepPointStyle"]}> </span>
            {
                self.state.showLabel ? 
              <span className= 'junction-label stick-center'>{item}</span> : 
              ""
            }
            </li>
            )
        }) 
         return junction;
    },
     render: function() {
         let timeline = this._styleSheet()["timelineStyle"];
         timeline["width"] =this.state.interval*this.state.junctionArray.length
         return (
         <div className = 'timeline-wrapper'>
         <ul className = 'timeline list' style={timeline}> 
         { this._plotSteps() } 
         </ul> 
         <ul className = 'current list' style = {this._styleSheet()["currentStyle"]}></ul>
         </div >
         )
     }
});
