from web.models import UserProfile


def get_profile(backend, strategy, details, response,
                user=None, *args, **kwargs):
    profile = UserProfile.objects.create(
        user=user,
        profile_img=response.get('profile_image_url_https', '').replace('_normal', ''),
        followers=response.get('followers_count', 0),
        following=response.get('friends_count', 0),
        posts=response.get('statuses_count', 0),
    )

    print profile
