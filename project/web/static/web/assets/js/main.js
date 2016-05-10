$(document).ready(function () {
    $.get('/api/v1/analysis', function (data) {
        render(data);
        bindEvents(data);
    });
});

function render(data) {
    console.log(data);

    if (data.categories) {
        var $root = $('.Content');
        var info = getCatInfo(data.categories);

        for (var i = 0; i < info.length; i++) {
            renderCategory(info[i], $root.find('.CategoryList-items'));
        }
    }
}

function bindEvents(data) {
    var $root = $('.Content');
    var $posts = $root.find('.TweetList-items');

    $root.on('click', '.CategoryItem', function (e) {
        var catIdx = $(this).data('catIdx');
        renderPosts(data.categories[catIdx].posts, $posts)
    });
}

function getCatInfo(categories) {
    var cats = [];
    for (var i = 0; i < categories.length; i++) {
        cats.push({
            'idx': i,
            'name': categories[i].category.name,
            'count': categories[i].posts.length,
        });
    }
    return cats;
}

function renderPosts(posts, $node) {
    var ids = posts.slice(0, 100);
    $.get('/tweets', {
        ids: ids,
    }, function (data) {
        var markup = '';
        for (var i = 0; i < data.tweets.length; i++) {
            markup += getPostMarkup(data.tweets[i]);
        }

        $node.empty().append(markup);
    });
}

function getPostMarkup(post) {
    return    '<li class="TweetList-item TweetItem">'
        +        '<div class="TweetItem-details">'
        +            '<a href="#">'
        +                '<span class="TweetItem-delete glyphicon glyphicon-remove"></span>'
        +            '</a>'
        +            '<p class="TweetItem-name">'
        +                post.text
        +            '</p>'
        +        '</div>'
        +    '</li>'
        ;
}

function renderCategory(c, $node) {
    var markup =    '<li class="CategoryList-item CategoryItem" data-cat-idx="' + c.idx + '">'
                +        '<div class="CategoryItem-hoverBar"></div>'
                +        '<div class="CategoryItem-details">'
                +            '<span class="CategoryItem-name">'
                +                c.name
                +            '</span>'
                +            '<span class="CategoryItem-count">'
                +                c.count
                +            '</span>'
                +        '</div>'
                +        '<div class="CategoryItem-actions">'
                +            '<div class="row">'
                +                '<a class="CategoryItem-action col-xs-3" href="#">'
                +                    '<span class="CategoryItem-actionIcon glyphicon glyphicon-ok-circle"></span>'
                +                '</a>'
                +                '<a class="CategoryItem-action col-xs-3" href="#">'
                +                    '<span class="CategoryItem-actionIcon glyphicon glyphicon-globe"></span>'
                +                '</a>'
                +                '<a class="CategoryItem-action col-xs-3" href="#">'
                +                    '<span class="CategoryItem-actionIcon glyphicon glyphicon-ban-circle"></span>'
                +                '</a>'
                +                '<a class="CategoryItem-action col-xs-3" href="#">'
                +                    '<span class="CategoryItem-actionIcon glyphicon glyphicon-eye-close"></span>'
                +                '</a>'
                +            '</div>'
                +        '</div>'
                +    '</li>';

    $node.append(markup);
}

function renderPost(post) {
    return '<li class="CategoryPost">'
        +              '<p>'
        +                  post
        +              '</p>'
        +          '</li>'
        ;
}