'use strict'
document.addEventListener('DOMContentLoaded', function() {
    const meals = document.querySelectorAll('.menu-card__row');
    const mealList = document.querySelector('.ordered-items-list');
    const totalPriceHtml = document.querySelector('.total-price');
    // clear order
    const clearBtn = document.querySelector('.clear-btn');
    const confirmClearModal = document.querySelector('.confirm-clear-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn');
    const confirmClearBtn = document.querySelector('.confirm-clear--clear');
    const closeOverlay = document.querySelector('.close-overlay');
    const modalCancelBtns = document.querySelectorAll('.modal__button--close');
    // clear modal animation parts
    const clearModalDissapear = document.querySelector('.confirm-clear-modal__dissappear-after-clear');
    const clearModalAppearr = document.querySelector('.clear-success-text');
    const clearModalIcon = document.querySelector('.confirm-clear__icon');
    const clearModalIconSpans = clearModalIcon.querySelectorAll('span');
    const clearModalCheckmarkSvg = document.querySelector('.checkmark-svg');
    let clearModalCheckmarkPath = document.querySelector('.checkmark-path');
    // delete item modal consts
    const deleteItemModal = document.querySelector('.delete-item-modal');
    const deleteItemModalDeleteBtn = document.querySelector('.delete-item-modal__button--delete');
    // order btn 
    const orderBtn = document.querySelector('.order-btn');
    // confirm order modal
    const confirmOrderModal = document.querySelector('.confirm-order-modal');
    const confirmOrderBtn = document.querySelector('.confirm-order-modal__button--order');
    const confirmOrderModalIcon = document.querySelector('.confirm-order-modal__icon');
    const confirmOrderModalDissappear = document.querySelector('.confirm-order-modal__dissappear');
    const confirmOrderModalAppear = document.querySelector('.confirm-order-modal__appear');
    const orderModalCheckmarkPath = document.querySelector('.order-checkmark-path');
    const confirmOrderModalTotalPrice = document.querySelector('.confirm-order-modal__total-price');

    let orderedMealsArray = [];
    let plusBtns, minusBtns, deleteMealBtns, totalPrice, clickedMealName,  clickedMealNameWithHyphen, clickedMealPrice, clickedMealQuantity, clickedMealTotalPrice, orderedMealLI, prices, alreadyInCart, currentObject;
    let orderedItemNameSpan, orderedItemQuantitySpan, itemTotalPriceSpan;
    // object class
    class NewItemInMenu {
        constructor(name, liName, quantity, basePrice, totalPrice) {
            this.name = name;
            this.liName = liName;
            this.quantity = quantity;
            this.basePrice = basePrice;
            this.totalPrice = totalPrice;
        }
    }
    function findPlusMinusDeleteBtns() {
        plusBtns = mealList.querySelectorAll('.plus-btn');
        minusBtns = mealList.querySelectorAll('.minus-btn');
        deleteMealBtns = mealList.querySelectorAll('.delete-meal-btn');
    }
    function createNewItemLi() {
        // create new li 
        orderedMealLI = document.createElement('li');
        orderedMealLI.className = clickedMealNameWithHyphen;
        mealList.append(orderedMealLI);
        // create ordered-item div in li
        let orderedItemDiv = document.createElement('div');
        orderedItemDiv.className = 'ordered-item';
        orderedMealLI.appendChild(orderedItemDiv);
        // create name and quantity div in ordered-item
        let orderedItemNameAndQuantityDiv = document.createElement('div');
        orderedItemNameAndQuantityDiv.className = 'ordered-item__name-and-quantity';
        orderedItemDiv.appendChild(orderedItemNameAndQuantityDiv);
        // name and quantity p
        let nameAndQuantityP = document.createElement('p');
        orderedItemNameAndQuantityDiv.appendChild(nameAndQuantityP);
        // create name span
        orderedItemNameSpan = document.createElement('span');
        orderedItemNameSpan.className = 'ordered-item-name';
        nameAndQuantityP.appendChild(orderedItemNameSpan);
        // create quantity span
        orderedItemQuantitySpan = document.createElement('span');
        orderedItemQuantitySpan.className = 'ordered-item-quantity';
        nameAndQuantityP.appendChild(orderedItemQuantitySpan);
        // create plus, minus, delete, total price div in ordered-item
        let orderedItemPlusMinusDeleteTotalPriceDiv = document.createElement('div');
        orderedItemPlusMinusDeleteTotalPriceDiv.className = 'ordered-item__plus-minus-delete-total-price';
        orderedItemDiv.appendChild(orderedItemPlusMinusDeleteTotalPriceDiv);
        // create plus, minus, delete btns div
        let plusMinusDeleteBtnsDiv = document.createElement('div');
        plusMinusDeleteBtnsDiv.className = 'plus-minus-delete-btns';
        orderedItemPlusMinusDeleteTotalPriceDiv.appendChild(plusMinusDeleteBtnsDiv);
        // create minus btn
        let minusButtonHtml = document.createElement('button');
        minusButtonHtml.className = 'minus-btn plus-and-minus-btns';
        minusButtonHtml.classList.add(orderedMealLI.className);
        minusButtonHtml.innerHTML = '<span class="minus-btn__icon"></span>'
        plusMinusDeleteBtnsDiv.appendChild(minusButtonHtml);
        // create plus btn
        let plusButtonHtml = document.createElement('button');
        plusButtonHtml.className = 'plus-btn plus-and-minus-btns';
        plusButtonHtml.classList.add(orderedMealLI.className);
        plusButtonHtml.innerHTML = '<span class="plus-btn__icon"></span> <span class="plus-btn__icon"></span>'
        plusMinusDeleteBtnsDiv.appendChild(plusButtonHtml);
        // create delete btn
        let deleteButtonHtml = document.createElement('button');
        deleteButtonHtml.className = 'delete-meal-btn';
        deleteButtonHtml.classList.add(orderedMealLI.className);
        deleteButtonHtml.innerHTML = '<i class="fas fa-trash-alt"></i>';
        plusMinusDeleteBtnsDiv.appendChild(deleteButtonHtml);
        // create item total price span
        itemTotalPriceSpan = document.createElement('span');
        itemTotalPriceSpan.classList = 'ordered-item-price';
        orderedItemPlusMinusDeleteTotalPriceDiv.appendChild(itemTotalPriceSpan);
    }
    function orderedMealLiSetHtml() {
        orderedItemNameSpan.innerHTML = clickedMealName;
        clickedMealQuantity = 'X' + clickedMealQuantity;
        orderedItemQuantitySpan.innerHTML =' ' + clickedMealQuantity;
        itemTotalPriceSpan.innerHTML = clickedMealTotalPrice;
    }
    function findItemInOrderArray() {
        if (orderedMealsArray.length === 0) {
            alreadyInCart = false;
            return;
        }
        for ( var i=0; i < orderedMealsArray.length; i++) {
            if (orderedMealsArray[i].liName == clickedMealNameWithHyphen) {
                alreadyInCart = true;
                orderedMealLI.className = orderedMealsArray[i].liName;
                return;
            }
            else {
                alreadyInCart = false;
            }
        }
    }
    function setTotalPrice() {
        totalPrice = 0;
        prices = mealList.querySelectorAll('.ordered-item-price');
        for (var i=0; i < prices.length; i++) {
            totalPrice += parseFloat(prices[i].innerHTML);
        }
        totalPrice = totalPrice.toFixed(2);
        totalPriceHtml.innerHTML = totalPrice;
    }
    function findObjectInOrderArray() {
        for (var i=0; i<orderedMealsArray.length; i++) {
            if (orderedMealsArray[i].liName == orderedMealLI.className) {
                currentObject = orderedMealsArray[i];
                return;
            }
        }
    }
    function deleteMealFromList() {
        for (var i=0; i<orderedMealsArray.length; i++) {
            if (currentObject.liName == orderedMealsArray[i].liName) {
                orderedMealsArray.splice(i, 1);
                break;
            }
        }
        orderedMealLI.remove();
    }
    function plusOneItem() {
        findObjectInOrderArray();
        orderedItemQuantitySpan = orderedMealLI.querySelector('.ordered-item-quantity');
        itemTotalPriceSpan = orderedMealLI.querySelector('.ordered-item-price');
        clickedMealPrice = currentObject.basePrice;
        clickedMealQuantity = currentObject.quantity;
        clickedMealQuantity++;
        clickedMealTotalPrice = (parseFloat(clickedMealPrice * clickedMealQuantity)).toFixed(2);
        currentObject.quantity = clickedMealQuantity;
        currentObject.totalPrice = clickedMealTotalPrice;
    }
    function minusOneItem() {
        findObjectInOrderArray();
        orderedItemQuantitySpan = orderedMealLI.querySelector('.ordered-item-quantity');
        itemTotalPriceSpan = orderedMealLI.querySelector('.ordered-item-price');
        clickedMealPrice = currentObject.basePrice;
        clickedMealQuantity = currentObject.quantity; 
        if (clickedMealQuantity > 1) {
            clickedMealQuantity--;
            clickedMealTotalPrice = (parseFloat(clickedMealPrice * clickedMealQuantity)).toFixed(2);
            currentObject.quantity = clickedMealQuantity;
            currentObject.totalPrice = clickedMealTotalPrice;
        }
        else {
            deleteMealFromList();
        }
    }
    function clearList() {
        mealList.innerHTML = '';
        orderedMealsArray = [];
        totalPrice = (0).toFixed(2);
        totalPriceHtml.innerHTML = totalPrice;
    }
    // close modals functions
    function closeClearConfirmModal() {
        confirmClearModal.classList.remove('open');
        closeOverlay.classList.remove('open');
    }
    function closeDeleteItemModal() {
        deleteItemModal.classList.remove('open');
        closeOverlay.classList.remove('open');
    }
    function closeConfirmOrderModal() {
        confirmOrderModal.classList.remove('open');
        closeOverlay.classList.remove('open');
    }
    function closeModals() {
        if (confirmClearModal.classList.contains('open')) {
            closeClearConfirmModal();
        }
        if (deleteItemModal.classList.contains('open')) {
            closeDeleteItemModal();
        }
        if (confirmOrderModal.classList.contains('open')) {
            closeConfirmOrderModal();
        }
    }
    
    if (meals) {
        // add meals to cart
        meals.forEach(meal => {
            meal.onclick = () => {
                clickedMealName = meal.querySelector('.menu-card__name').innerHTML.trim().toLowerCase();
                clickedMealNameWithHyphen = clickedMealName.replace(/\s/g, '-');
                clickedMealPrice = meal.querySelector('.menu-card__price').innerHTML;
                findItemInOrderArray();
                // first time in menu
                if (alreadyInCart == false) {
                    clickedMealQuantity = 1;
                    clickedMealTotalPrice = clickedMealPrice;
                    createNewItemLi();
                    // make new object and add to array
                    orderedMealsArray.push(new NewItemInMenu(clickedMealName, clickedMealNameWithHyphen, clickedMealQuantity, clickedMealPrice, clickedMealTotalPrice));
                }
                // alrady in menu
                else {
                    plusOneItem();
                }
                // set li html
                orderedMealLiSetHtml();
                // total price
                setTotalPrice();
            }
        })

        // clear list 
        clearBtn.onclick = () => {
            if (orderedMealsArray.length > 0) {
                confirmClearModal.classList.add('open');
                closeOverlay.classList.add('open');
            }
        }
        confirmClearBtn.onclick = () => {
            clearList();
            closeClearConfirmModal();
            setTimeout(function() {
                clearModalDissapear.style.display = 'none';
                clearModalAppearr.style.display = 'block';
                confirmClearModal.classList.add('open');
                clearModalIcon.style.border = '3px solid #82CE34';
                clearModalIconSpans.forEach(icons => {
                    icons.style.display = 'none';
                });
                clearModalCheckmarkSvg.style.display = 'inline';
            }, 300);
            // checkmark animation 
            let checkmarkPathLenth = clearModalCheckmarkPath.getTotalLength();
            clearModalCheckmarkPath.style.strokeDasharray = checkmarkPathLenth;
            clearModalCheckmarkPath.style.strokeDashoffset = checkmarkPathLenth;
            setTimeout(function() {
                clearModalCheckmarkPath.style.animation = 'checkmark 0.4s linear forwards';
            }, 700);
            setTimeout(function() {
                confirmClearModal.classList.remove('open');
            }, 1700);
            setTimeout(function() {
                clearModalDissapear.style.display = 'block';
                clearModalAppearr.style.display = 'none';
                clearModalIcon.style.border = '3px solid #f15e5e';
                clearModalIconSpans.forEach(icons => {
                    icons.style.display = 'block';
                });
                clearModalCheckmarkSvg.style.display = 'none';
                clearModalCheckmarkPath.style.animation = 'none';
            }, 2000);
        }
        modalCancelBtns.forEach(btn => {
            btn.onclick = () => {   
                closeModals();
            } 
        })
        closeModalBtns.forEach(btn => {
            btn.onclick = () => {
                closeModals();
            }
        })
        closeOverlay.onclick = () => {
            closeModals();
        }

        mealList.onmouseover = () => {
            findPlusMinusDeleteBtns();
            // plus btns 
            plusBtns.forEach(btn => {
                btn.onclick = () => {
                    let itemLis = mealList.children;
                    for (var i=0; i<itemLis.length; i++) {
                        let liClass = itemLis[i].className;
                        if (btn.classList.contains(liClass)) {
                            orderedMealLI = itemLis[i];
                            break;
                        }
                    }
                    console.log(orderedMealLI);
                    console.log(itemLis);
                    plusOneItem();
                    orderedMealLiSetHtml();
                    setTotalPrice();
                }
            })
            // minus btns 
            minusBtns.forEach(btn => {
                btn.onclick = () => {
                    let itemLis = mealList.childNodes;
                    for (var i=0; i<itemLis.length; i++) {
                        let liClass = itemLis[i].className;
                        if (btn.classList.contains(liClass)) {
                            orderedMealLI = itemLis[i];
                            break;
                        }
                    }
                    minusOneItem();
                    orderedMealLiSetHtml();
                    setTotalPrice();
                }
            })
            // delete meal btns 
            deleteMealBtns.forEach(btn => {
                btn.onclick = () => {
                    let itemLis = mealList.childNodes;
                    for (var i=0; i<itemLis.length; i++) {
                        let liClass = itemLis[i].className;
                        if (btn.classList.contains(liClass)) {
                            orderedMealLI = itemLis[i];
                            break;
                        }
                    }
                    findObjectInOrderArray();
                    deleteItemModal.classList.add('open');
                    closeOverlay.classList.add('open');
                }
            })
            // delete item modal
            deleteItemModalDeleteBtn.onclick = () => {
                deleteMealFromList();
                closeDeleteItemModal();
            }
        }

        // order 
        orderBtn.onclick = () => {
            if (orderedMealsArray.length > 0) {
                confirmOrderModal.classList.add('open');
                closeOverlay.classList.add('open');
                confirmOrderModalTotalPrice.innerHTML = totalPrice;
            }
        }
        confirmOrderBtn.onclick = () => {
            confirmOrderModalIcon.classList.remove('active');
            let orderList = orderedMealsArray;
            clearList();
            console.log(orderList);
            confirmOrderModalDissappear.style.maxWidth = '0';
            confirmOrderModalDissappear.style.maxHeight = '0';
            confirmOrderModalDissappear.style.visibility = 'hidden';
            confirmOrderModalAppear.style.maxHeight = '50px';
            // circle animation
            setTimeout(function() {
                confirmOrderModalIcon.classList.add('active');
            }, 50);
            // checkmark animation
            let orderCheckMarkLength = orderModalCheckmarkPath.getTotalLength();
            orderModalCheckmarkPath.style.strokeDasharray = orderCheckMarkLength;
            orderModalCheckmarkPath.style.strokeDashoffset = orderCheckMarkLength;
            setTimeout(function() {
                orderModalCheckmarkPath.style.animation = 'checkmark 0.4s linear forwards';
            }, 500);
            setTimeout(function() {
                closeConfirmOrderModal();
            }, 2000);
            setTimeout(function() {
                confirmOrderModalDissappear.style.maxWidth = '450px';
                confirmOrderModalDissappear.style.maxHeight = '130px';
                confirmOrderModalDissappear.style.visibility = 'visible';
                confirmOrderModalAppear.style.maxHeight = '0';
                orderModalCheckmarkPath.style.animation = 'none';
                orderModalCheckmarkPath.style.strokeDasharray = '0';
                orderModalCheckmarkPath.style.strokeDashoffset = '0'
            }, 2300);
        }

        window.onkeydown = (e) => {
            if (e.key === 'Escape') {
                closeModals();
            }
        }
    }
})