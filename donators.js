jQuery(document).ready(function($){

    var scrollableBlock = $(".donators-scrollable-container .scrollable .items");

    $('#donators-block').children().each(function(){
        $(this).clone().appendTo(scrollableBlock);
    });
    var donators = $(".donators-scrollable-container .scrollable .items .donator");
    wrapDonators(donators);
    
    /* -- OWL CAROUSEL -- */
    function owlCarouselActive(items){
        var items = $(".donators-scrollable-container .scrollable").children();
        owl = items.owlCarousel({
                loop:false,
                margin:10,
                nav:true,
                responsive:{
                    0:{
                        items:1
                    },
                    779:{
                        items:2
                    }
                }
        });
    }
    owlCarouselActive();

    /* -- RESET CAROUSEL -- */
    function resetCarousel(){
        var donatorsgroup = $(".donators-scrollable-container .scrollable .items .donators-group");
        owl.trigger("destroy.owl.carousel");
        $(".donators-scrollable-container .scrollable .items").html(donatorsgroup);
        owlCarouselActive();
    }

    /* -- COUNTRY -- */
    $(".donators-country span").click(function(){
        scrollableBlock.empty();
        //$(".donators-scrollable-container .scrollable .items").removeClass("owl-loaded owl-drag");
        $(this).addClass("selected").siblings().removeClass("selected");
        $(".reset-filters").addClass("active");
        var locationId = $('.donators-country .selected').attr('data-abroad');

     

        if($(".alphabet span").hasClass("selected")){    //if alphabet letter is clicked
            var donator = $(".donators-scrollable-container .scrollable .items").children();
            //console.log(donator);
            
            $('#donators-block').children().each(function(){

                var donatorId = $(this).attr('data-abroad');
                var letter = $('.alphabet .selected').text().toLowerCase();

                if(donatorId == locationId){ //donator hidden & data-abroad equal
                    //console.log(2);
                    if($(this).children('span.surname').text().length){
                        if(jQuery.trim($(this).children('span.surname').text().toLowerCase()).indexOf(letter) == 0){
                            $(this).clone().appendTo(scrollableBlock);
                        }
                    }else{
                        //console.log(3);
                        if(jQuery.trim($(this).children('span.name').text().toLowerCase()).indexOf(letter) == 0){
                            $(this).clone().appendTo(scrollableBlock);
                        }
                    }
                }

            });
            var donators = $(".donators-scrollable-container .scrollable .items .donator");
            wrapDonators(donators);

            resetCarousel();

        }else{ //no alphabet letter is clicked
            $('#donators-block').children().each(function(){
                var donatorId = $(this).attr('data-abroad');
                
                if(locationId == donatorId){
                    $(this).clone().appendTo(scrollableBlock);
                }
            });
            var donators = $(".donators-scrollable-container .scrollable .items .donator");
            wrapDonators(donators);
            
            resetCarousel();
        }
       
    });

    /* -- ALPHABET -- */
    $(".alphabet span").click(function(){
        scrollableBlock.empty();
        $(this).addClass("selected").siblings().removeClass("selected");
        $(".reset-filters").addClass("active");

        var letter = $('.alphabet .selected').text().toLowerCase();

        donatorGenerate(letter);

    });

    /* -- SEARCH FIELD -- */
    $(".search-donator").keyup(function(){
        scrollableBlock.empty();
        $(".alphabet span").removeClass("selected");
        var query = $(this).val().toLowerCase();

        donatorGenerate(query);
        
    });

    /* -- SHOW / HIDE DONATOR FUNCTION -- */
    function donatorGenerate(x){
        $('#donators-block').children().each(function(){
            
            if($(this).children('span.surname').text().length){
                if(jQuery.trim($(this).children('span.surname').text().toLowerCase()).indexOf(x) == 0){
                    $(this).clone().appendTo(scrollableBlock);
                }
            }else{
                if(jQuery.trim($(this).children('span.name').text().toLowerCase()).indexOf(x) == 0){
                    $(this).clone().appendTo(scrollableBlock);
                } 
            }
        });
        var donators = $(".donators-scrollable-container .scrollable .items .donator");
        wrapDonators(donators);

        resetCarousel();
    }

    /* -- RESET BUTTON -- */
    $(".reset-button").click(function(){
        scrollableBlock.empty();
        $(".donators-country span").removeClass("selected");
        $(".alphabet span").removeClass("selected");
        $(".search-donator").val('');
        $(".reset-filters").removeClass("active");

        $('#donators-block').children().each(function(){
            $(this).clone().appendTo(scrollableBlock);
        });
        var donators = $(".donators-scrollable-container .scrollable .items .donator");
        wrapDonators(donators);

        resetCarousel();
    });

    /* -- WRAP DONATORS -- */
    function wrapDonators(donators){
        for (var i = 0; i < donators.length; i += 16) {
            var div = $("<div/>", {
                class: 'donators-group'
            });
            donators.slice(i, i + 16).wrapAll(div);
        }
    }
});