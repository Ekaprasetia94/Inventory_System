$(document).ready(function() {
    var baseUrl = 'https://re-inventor.herokuapp.com/api/';
    var categoriesUrl =  baseUrl + 'categories';
    var listCategoryElem = $('#list-category');
    var listItem = $('#list-item');

    $("body").on( "click", "a", function( event ) {
        var page = $(this).attr( "href" );

        if (page == '#list-category-page') {
            loadCategories();
        }

        if (page == '#category-detail-page') {
            var elem = $(event.target).closest('.detail');
            loadCategoryDetail(elem.data('category-id'));
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
                        html += '<li data-icon="gear" class="detail" data-category-id="' + item.id + '"><a href="#category-detail-page">' + item.name+ '</a></li>';
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

    function loadCategoryDetail(id)
    {
        console.log('loading detail');
        console.log(id);
        $.ajax({
            url: categoriesUrl + '/' + id,
            type: 'GET',
            cache: false,
            success: function(json) {
                console.log(json);
                if (json.category) {
                    console.log(json.category.name);
                    $('#category-name').html(json.category.name);

                    var html ='<li data-role="list-divider">List Item</li>';
                    console.log(json.category.items.length);
                    if (json.category.items.length){
                        $.each(json.category.items, function(index, item) {
                            html += '<li data-icon="gear" class="detail" data-category-id="' + item.id + '"><a href="#">' + item.name+ '</a></li>';
                        });
                    }else{
                        html += '<li data-icon="gear"><a href="#"> No data</a></li>';
                    }
                    listItem.html($(html));
                    listItem.trigger('create');
                    listItem.listview('refresh');

                }
            },
            error: function(xhr, desc, err) {
                alert(err);
                console.log(xhr + "\n" + err);
            }
        });
    }
});

