/**
 * Created by Administrator on 2017/5/19 0019.
 */
(function () {
    function VideoPlayer() {

    }
    /*  获取用户媒体数据，getUserMedia
        录制媒体信息   MediaRecorder
        不区分音频还是视频

    *  方法  start  开始
    *    pause   暂停
    *    resume   重新开始
    *    stop  结束
    *  事件
    *
    *   error
    *   pause  暂停
    *   ersume  继续录制
    *   start
    *   stop
    *   dataavailable  获得有效数据
    *
    *
    * */

    VideoPlayer.prototype.getVideostream = function () {

        var self = this;
        //保存获得的有效数据
        this.buffers = [];
        // 设置录制类型
        var config ={video:true};
        // var config ={audio:true};
        function success(stream) {
            // 录制媒体信息   MediaRecorder
            self.mediaRecoder = new MediaRecorder(stream);
            self.mediaRecoder.addEventListener('dataavailable',function (event) {
                self.buffers.push(event.data);
                console.log(event.data);
                // self.getVideoArrayBuffers();
            });
            self.mediaRecoder.addEvent();
        }
        function fail(error) {
            console.log(error);
        }

        //在设备中获得数据
        navigator.mediaDevices.getUserMedia(config).then(success).catch(fail);
    };

    VideoPlayer.prototype.addEvent = function () {

        this.mediaRecoder.addEventListener('stop',function () {
           // 将得到的数组转换
            var blob = new Blob(this.buffers,{mimeType:"video/webm"});

            var url = URL.createObjectURL(blob);
            // 放到标签中
            var video = document.createElement('video');
            video.src = url;
            document.body.appendChild(video);
            video.autoplay = true;

            video.onended = function () {
                document.body.removeChild(this);
            }

        });
    }


    window.VideoPlayer = VideoPlayer;
})();