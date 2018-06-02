from django.conf.urls import include, url
from django.contrib import admin
from search.views import getSearchResult

urlpatterns = [
    # Examples:
    # url(r'^$', 'SearchProject.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^search/$', getSearchResult),
]
