$(document).ready(function() {
    var baseUrl = 'https://re-inventor.herokuapp.com/api/';
    var categoriesUrl =  baseUrl + 'categories';
    var listCategoryElem = $('#list-category');

    $( "a" ).on( "click", function( event ) {
        var page = $(this).attr( "href" );

        if (page == '#list-category-page') {
            loadCategories();
        }
    });

    function loadCategories() {
        console.log('loading categories');
        $.ajax({
            url: categoriesUrl ,
            type: 'GET',
            cache: false,
            success: function(json) {
                if (json.categories) {
                    console.log(json.categories.length);

                    var html ='<li data-role="list-divider">Category</li>';
                    $.each(json.categories, function(index, item) {
                        html += '<li data-icon="gear"><a href="Category.html">' + item.name+ '</a></li>';
                    });

                    listCategoryElem.html($(html));
                    listCategoryElem.trigger('create');
                    listCategoryElem.listview('refresh');
                }
            },
            error: function(xhr, desc, err) {
                alert(err);
                console.log(xhr + "\n" + err);
            }
        });
    }
});

