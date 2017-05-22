/**
 * Created by Administrator on 2017/5/22 0022.
 */
(function () {

    function context(selector) {
        this.canvas = document.querySelector(selector).getContext('2d');
    }

    context.prototype.add = function () {
        
        var addtool = this.canvas.createLinearGradient(0,0,500,0);

        addtool.addColorStop(0.4,"red");
        addtool.addColorStop(0.6,"yellow");
        this.canvas.fillStyle = addtool;
        this.canvas.fillRect(50,250,0,25);
        this.addvalue();
    };

    context.prototype.addvalue = function () {
        var self = this;
        var i = 0;
      var addTime =  setInterval(function () {
            self.canvas.clearRect(0,0,500,0);
            self.canvas.fillRect(50,250,i,25);
            i = i+10;

            if(i == 400)
            {
                clearTimeout(addTime);
            }
        },2000)



    }
    window.context = context;


})();