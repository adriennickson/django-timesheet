from django.template.defaulttags import register
from django.conf import settings

@register.filter
def env(key):
    return getattr(settings, key, "")
