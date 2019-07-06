var firstItemLeft;

prepareSlider();

$(".left-arrow").click(function () {
    moveLeft();
});

$(".right-arrow").click(function () {
    moveRight();
});

$(".autoplay").click(function () {
    $(this).toggleClass("on");

    if ($(this).hasClass("on")) {
        moveRight();
        autoPlay = setInterval(moveRight, 4000);
    }
    else {
        clearInterval(autoPlay);
    }
});

$(".slider").on("click", ".item:not(.active)", function () {
    let selectedItemIndex = $(this).index();
    let activeItemIndex = $(".item.active").index();
    if (selectedItemIndex > activeItemIndex)
        moveLeft();
    else
        moveRight();
});

function sortItems() {
    let items = $(".item");
    let left = firstItemLeft;
    for (let i = 0; i < items.length; i++) {
        $(items[i]).css({ "left": left + "%" });

        if (!$(items[i]).hasClass("active"))
            left += 25;
        else
            left += 50;
    }
}

function addItemsToStartEndOfSlider() {
    let originalItems = $(".item");
    let currentItems = $(".item");
    let nextItemsCount = $(".item.active").nextAll(".item").length;
    let prevItemsCount = $(".item.active").prevAll(".item").length;
    let prevItemsCountForHelper;
    let nextItemsCountForHelper;

    if (nextItemsCount < 2) {

        if (prevItemsCount >= 4) {
            nextItemsCountForHelper = nextItemsCount;

            for (let i = 0; i < 2 - nextItemsCountForHelper; i++) {
                imageSrc = $(".item:nth-child(1) > img").attr("src");
                let newItem = $("<div>").addClass("item");
                let newImage = $("<img>").attr({ "src": imageSrc }).appendTo(newItem);
                $(".items-wrapper").append(newItem);
                $(".item:nth-child(1)").remove();
                nextItemsCount++;
                prevItemsCount--;
                firstItemLeft += 25;
            }
        }
        else {
            for (let i = 0; i < originalItems.length; i++) {
                imageSrc = $(".item:nth-child(" + (i + 1) + ") > img").attr("src");
                let newItem = $("<div>").addClass("item");
                let newImage = $("<img>").attr({ "src": imageSrc }).appendTo(newItem);
                $(".items-wrapper").append(newItem);
                nextItemsCount++;
                if ((i == originalItems.length - 1) && (nextItemsCount < 2))
                    i = -1;
            }
        }

    }

    if (prevItemsCount < 2) {

        if (nextItemsCount >= 4) {
            currentItems = $(".item");
            prevItemsCountForHelper = prevItemsCount;

            for (let i = 0; i < 2 - prevItemsCountForHelper; i++) {
                imageSrc = $(".item:nth-child(" + currentItems.length + ") > img").attr("src");
                let newItem = $("<div>").addClass("item");
                let newImage = $("<img>").attr({ "src": imageSrc }).appendTo(newItem);
                $(".items-wrapper").prepend(newItem);
                $(".item:nth-child(" + (currentItems.length + 1) + ")").remove();
                nextItemsCount--;
                prevItemsCount++;
                firstItemLeft -= 25;
            }
        }
        else {
            for (let i = originalItems.length - 1; i >= 0; i--) {
                imageSrc = $(".item:nth-child(" + originalItems.length + ") > img").attr("src");
                let newItem = $("<div>").addClass("item");
                let newImage = $("<img>").attr({ "src": imageSrc }).appendTo(newItem);
                $(".items-wrapper").prepend(newItem);
                prevItemsCount++;
                firstItemLeft -= 25;
                if ((i == 0) && (prevItemsCount < 2))
                    i = originalItems.length;
            }
        }

    }
}

function prepareSlider() {
    let items = $(".item");

    if (!$(items).hasClass("active"))
        $(".item").eq(0).addClass("active");

    let prevItemsCount = $(".item.active").prevAll(".item").length;
    firstItemLeft = -(prevItemsCount - 1) * 25;

    addItemsToStartEndOfSlider();
    sortItems();
}

function moveLeft() {
    $(".item.active").removeClass("active").next(".item").addClass("active");
    firstItemLeft -= 25;
    sortItems();

    let nextItemsCount = $(".item.active").nextAll(".item").length;
    if (nextItemsCount == 1) {
        let imageSrc = $(".item:nth-child(1) > img").attr("src");
        $(".item:nth-child(1)").remove();

        let newItem = $("<div>").addClass("item");
        let newImage = $("<img>").attr({ "src": imageSrc }).appendTo(newItem);
        $(".items-wrapper").append(newItem);

        firstItemLeft += 25;
        sortItems();
    }
}

function moveRight() {
    $(".item.active").removeClass("active").prev(".item").addClass("active");
    firstItemLeft += 25;
    sortItems();

    let prevItemsCount = $(".item.active").prevAll(".item").length;
    if (prevItemsCount == 1) {
        let imageSrc = $(".item:last-child > img").attr("src");
        $(".item:last-child").remove();

        let newItem = $("<div>").addClass("item");
        let newImage = $("<img>").attr({ "src": imageSrc }).appendTo(newItem);
        $(".items-wrapper").prepend(newItem);

        firstItemLeft -= 25;
        sortItems();
    }
}

/*Responsive*/
if (window.innerHeight < 410)
    $(".slider").css({ "height": window.innerHeight - 10 + "px" });
else
    $(".slider").css({ "height": "400px" });

window.onresize = function () {
    if (window.innerHeight < 410)
        $(".slider").css({ "height": window.innerHeight - 10 + "px" });
    else
        $(".slider").css({ "height": "400px" });
};