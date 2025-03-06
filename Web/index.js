
              const infoBox = document.getElementById('infoBox');
              const myButton = document.getElementById('myButton');
              const closeButton = document.getElementById('closeButton');
            
              myButton.addEventListener('click', function() {
                infoBox.style.display = 'block';
                centerInfoBox();
              });
            
              closeButton.addEventListener('click', function() {
                infoBox.style.display = 'none';
              });
            
              function centerInfoBox() {
                const width = infoBox.offsetWidth;
                const height = infoBox.offsetHeight;
                const left = (window.innerWidth - width) / 2;
                const top = (window.innerHeight - height) / 2;
            
                infoBox.style.left = left + 'px';
                infoBox.style.top = top + 'px';
              }
            
              window.addEventListener('resize', centerInfoBox);

