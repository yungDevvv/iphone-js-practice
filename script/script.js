document.addEventListener('DOMContentLoaded', () => {
   const tab = () => {

      const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
      const cardDetailsTitleElem = document.querySelector('.card-details__title');
      const cardImageItemElem = document.querySelector('.card__image_item');
      const cardDetailsPriceElem = document.querySelector('.card-details__price');

      const data = [
         {
            name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
            img: 'img/iPhone-graphite.png',
            price: 91990,
         },
         {
            name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
            img: 'img/iPhone-silver.png',
            price: 120990,
         },
         {
            name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
            img: 'img/iPhone-blue.png',
            price: 101190,
         }
      ];

      let tabRemoveActiveClass = function (pseudoArray) {
         pseudoArray.forEach(item => {
            item.classList.remove('active');
         })
      }

      cardDetailChangeElems.forEach((btn, i) => {
         btn.addEventListener('click', () => {
            if (!btn.classList.contains('active')) {
               tabRemoveActiveClass(cardDetailChangeElems);
               btn.classList.add('active');
               cardDetailsTitleElem.textContent = data[i].name;
               cardImageItemElem.src = data[i].img;
               cardImageItemElem.alt = data[i].name;
               cardDetailsPriceElem.textContent = data[i].price + '₽';
            }
         })
      })

   }

   const accordion = () => {
      //   const characteristicsTitleElems = document.querySelectorAll('.characteristics__title');
      //   const characteristicsDescriptionElems = document.querySelectorAll('.characteristics__description');

      //   characteristicsTitleElems.forEach((item, i) => {
      //       item.addEventListener('click', () => {
      //          item.classList.toggle('active');
      //          characteristicsDescriptionElems[i].classList.toggle('active');
      //       });
      //   });

      const characteristicsListElem = document.querySelector('.characteristics__list');
      const characteristicsItemElems = document.querySelectorAll('.characteristics__item');
      const characteristicsTitle = document.querySelectorAll('.characteristics__title');

      const open = (button, dropDown) => {
         closeAllDrops();
         dropDown.style.height = `${dropDown.scrollHeight}px`;
         button.classList.add('active');
         dropDown.classList.add('active');
      };

      const close = (button, dropDown) => {
         button.classList.remove('active');
         dropDown.classList.remove('active');
         dropDown.style.height = '';
      };

      const closeAllDrops = () => {
         characteristicsTitle.forEach((elem) => {
            const description = elem.closest('.characteristics__item').querySelector('.characteristics__description');
            if (elem.classList.contains('active')) {
               close(elem, description)
            }


         })
      }

      characteristicsListElem.addEventListener('click', (e) => {
         const target = e.target;
         if (target.classList.contains('characteristics__title')) {
            const parent = target.closest('.characteristics__item');
            const description = parent.querySelector('.characteristics__description');
            description.classList.contains('active') ?
               close(target, description) :
               open(target, description);
         }
      });



   }

   const modal = () => {
      const buttonBuyPhone = document.querySelector('.card-details__button_buy');
      const modalBuyForm = document.querySelector('.modal');
      const modalBuyFormClose = document.querySelector('.modal__close');
      const modalTitle = document.querySelector('.modal__title');
      const cardDetailsTitleElem = document.querySelector('.card-details__title');
      const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
      const modalSubTitle = modalBuyForm.querySelector('.modal__subtitle');

      buttonBuyPhone.addEventListener('click', () => {
         modalBuyForm.classList.add('active');
         modalClose();
         modalProductTitle();
      })

      const modalClose = () => {
         modalBuyFormClose.addEventListener('click', () => {
            modalBuyForm.classList.remove('active');
         })
         window.addEventListener('click', (e) => {
            const target = e.target;
            if (target == modalBuyForm) {
               modalBuyForm.classList.remove('active');
            }
         })
         if (modalBuyForm.classList.contains('active')) {
            window.addEventListener('keydown', (e) => {
               if (e.code == 'Escape') {
                  modalBuyForm.classList.remove('active');
               }
            })
         }

      }

      const modalProductTitle = () => {
         if (cardDetailsTitleElem.classList.contains('active')) {
            modalTitle.textContent = cardDetailsTitleElem.textContent;
         }
      }

   }

   const getData = (url, callback) => {
      const request = new XMLHttpRequest();
      request.open('GET', url);
      request.send();

      request.addEventListener('readystatechange', () => {
         if (request.readyState !== 4) return;
         if (request.status === 200) {
            const response = JSON.parse(request.response);
            callback(response);
         }
         else {
            console.error(new Error('Ошибка:' + request.status));
         }
      });
   }

   const renderCrossSell = () => {
      const crossSellList = document.querySelector('.cross-sell__list');
      const showAllButton = document.querySelector('.show-all');

      const allGoods = [];
      const arrayShuffle = arr => {
         return arr.sort(() => {
            return Math.random() - 0.5;
         });
      }
      const createCrossSellItem = (good) => {
         let li = document.createElement('li');

         li.innerHTML = `
         <article class="cross-sell__item">
            <img class="cross-sell__image" src="${good.photo}" alt="${good.name}">
            <h3 class="cross-sell__title">${good.name}</h3>
            <p class="cross-sell__price">${good.price} ₽</p>
            <div class="button button_buy cross-sell__button">Купить</div>
         </article>
         `;
         return li;
      }

      const createCrossSellList = (goods) => {
         allGoods.push(...arrayShuffle(goods));
         
         showAllButton.addEventListener('click', () => {
            crossSellList.innerHTML = '';
            showAllButton.style.display = 'none';
            allGoods.forEach(item => {
               crossSellList.append(createCrossSellItem(item));
            })
         })
  
         const arrayShuffled = allGoods.slice(0, 4);
         arrayShuffled.forEach(item => {
            crossSellList.append(createCrossSellItem(item));
         })

      }

      getData('cross-sell-dbase/dbase.json', createCrossSellList);
   }

   tab();
   accordion();
   modal();
   renderCrossSell();
   amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger')



})




