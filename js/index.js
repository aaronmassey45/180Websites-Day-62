$(document).ready(function() {
  let canvas = document.getElementById('memecanvas');
  let ctx = canvas.getContext('2d');
  let img = document.getElementById('default-image');

  let deviceWidth = window.innerWidth;;
  canvasWidth = Math.min(600, deviceWidth - 20);
  canvasHeight = Math.min(480, deviceWidth - 20);
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  let imgX = canvas.width / 2 - img.width / 2;
  let imgY = canvas.height / 2 - img.height / 2;
  ctx.drawImage(img, imgX, imgY);

  scale = document.getElementById('scale');
  scale.addEventListener('change', doTransform, false);

  rotate = document.getElementById('rotate');
  rotate.addEventListener('change', doTransform, false);

  function doTransform() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    let val = document.getElementById('scale').value;
    ctx.scale(val, val);
    val = document.getElementById('rotate').value;
    ctx.rotate(val * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.drawImage(img, imgX, imgY);
    ctx.restore();
  }

  $('#fileInput').on('change', function() {
    imageLoader();
  })

  $('#custom-text').on('change', function() {
    ctx.lineWidth = 5;
    ctx.font = '20pt sans-serif';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';

    // Draw the text
    let text = document.getElementById('custom-text').value;
    text = text.toUpperCase();
    x = canvas.width / 2;
    y = canvas.height - canvas.height / 4.5;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  })

  $('#download').on('click', function() {
    save();
  })

  function imageLoader() {
    let reader = new FileReader();
    reader.onload = function(event) {
      img.onload = function() {
        ctx.drawImage(img, 0, 0);
      }
      img.src = reader.result;
    }
    reader.readAsDataURL(fileInput.files[0]);
  }
});
