function resize_canvas(){
            canvas = document.getElementById("canvas");
            if (canvas.width  < window.innerWidth)
            {
                canvas.width  = window.innerWidth;
            }

            if (canvas.height < window.innerHeight)
            {
                canvas.height = window.innerHeight;
            }
        }
