;/*!/pagelet/hotgallery/hotgallery.js*/
define("pagelet/hotgallery/hotgallery",["require","exports","module"],function(require,exports,module){var GALLERY_TMPL=function(obj){{var __t,__p="";Array.prototype.join}with(obj||{}){__p+="";for(var i=0;i<data.length;i++){var item=data[i],gallary_flag=item.gallary_flag,gallary_image_count=item.gallary_image_count,image_list=item.image_list||[],article_url=item.display_url,title=item.title;image_list.length&&(__p+="\n\n",1==item.gallary_flag?__p+='\n<li class="gallery_item style_1">\n	<!-- style_1为一张大图 -->\n	<a href="'+(null==(__t=article_url)?"":_.escape(__t))+'" target="_blank" ga_event="click_pictures_recommend">\n		<div class="gallery-con clearfix">\n		<span class="pic_number">'+(null==(__t=gallary_image_count)?"":_.escape(__t))+'图</span>\n		<div class="image large">\n			<img src="'+(null==(__t=image_list[0].url)?"":_.escape(__t))+'" alt="" />\n		</div>\n		</div>\n		<div class="title">\n			<div class="title_content">\n				<div class="pic_name">\n					<p>'+(null==(__t=title)?"":_.escape(__t))+"</p>\n				</div>\n			</div>\n		</div>\n	</a>\n</li>\n":2==gallary_flag?__p+='\n<li class="gallery_item style_2">\n	<!-- style_2为三张图左侧为大图 -->\n	<a href="'+(null==(__t=article_url)?"":_.escape(__t))+'" target="_blank" ga_event="click_pictures_recommend">\n		<div class="gallery-con clearfix">\n		<span class="pic_number">'+(null==(__t=gallary_image_count)?"":_.escape(__t))+'图</span>\n		<div class="image middle">\n			<img src="'+(null==(__t=image_list[0].url)?"":_.escape(__t))+'" alt="" />\n		</div>\n		<div class="image small">\n			<img src="'+(null==(__t=image_list[1].url)?"":_.escape(__t))+'" alt="" />\n		</div>\n		<div class="image small">\n			<img src="'+(null==(__t=image_list[2].url)?"":_.escape(__t))+'" alt="" />\n		</div>\n		</div>\n		<div class="title">\n			<div class="title_content">\n				<div class="pic_name">\n					<p>'+(null==(__t=title)?"":_.escape(__t))+"</p>\n				</div>\n		</div>\n	</div>\n</a>\n</li>\n":3==item.gallary_flag&&(__p+='\n<li class="gallery_item style_3">\n	<!-- style_3为三张图右侧为大图 -->\n	<a href="'+(null==(__t=article_url)?"":_.escape(__t))+'" target="_blank" ga_event="click_pictures_recommend">\n		<div class="gallery-con clearfix">\n		<span class="pic_number">'+(null==(__t=gallary_image_count)?"":_.escape(__t))+'图</span>\n		<!-- 后续记得加边框 -->\n		<div class="image small">\n			<img src="'+(null==(__t=image_list[0].url)?"":_.escape(__t))+'" alt="" />\n		</div>\n		<div class="image middle">\n			<img src="'+(null==(__t=image_list[1].url)?"":_.escape(__t))+'" alt="" />\n		</div>\n		<div class="image small">\n			<img src="'+(null==(__t=image_list[2].url)?"":_.escape(__t))+'" alt="" />\n		</div>\n		</div>\n		<div class="title">\n			<div class="title_content">\n				<div class="pic_name">\n					<p>'+(null==(__t=title)?"":_.escape(__t))+"</p>\n				</div>\n			</div>\n		</div>\n	</a>\n</li>\n"),__p+="\n\n")}__p+=""}return __p},GALLERY_API="/api/article/hot_gallery/";module.exports=Pagelet.extend({el:"#pagelet-hotgallery",init:function(){this.getGallery()},render:function(l){this.$dom.gallery.html(GALLERY_TMPL(l)),$(this.el).show()},getGallery:function(){if(!this.loading){this.loading=!0;var l={};$.ajax({url:GALLERY_API,type:"GET",dataType:"json",context:this,data:l,success:function(l){this.loading=!1,l=l||{},"success"===l.message&&this.render(l)},error:function(){this.loading=!1}})}}})});
;/*!/pagelet/hotvideo/hotvideo.js*/
define("pagelet/hotvideo/hotvideo",["require","exports","module"],function(require,exports,module){function videoDurationFormat(t){if("number"==typeof t){var e=3600,i=60,o=Math.floor(t/e),a=t-o*e,n=Math.floor(a/i),r=a-n*i,_="";return o&&(_+=(10>o?"0"+o:o)+":"),_+=(10>n?"0"+n:n)+":",_+=10>r?"0"+r:r}}var VIDEO_TMPL=function(obj){{var __t,__p="";Array.prototype.join}with(obj||{}){__p+="";for(var i=0;i<data.length;i++){var item=data[i],article_url=item.display_url,title=item.title,poster_url=item.pc_image_url;__p+='\n<li class="video-item">\n	<a class="video-link" href="'+(null==(__t=article_url)?"":_.escape(__t))+'" target="_blank" ga_event="click_video_recommend">\n		<div class="video-title">'+(null==(__t=title)?"":_.escape(__t))+'</div>\n		<img class="video-poster" src="'+(null==(__t=poster_url)?"":_.escape(__t))+'" onload="this.style.opacity=1"/>\n		<i class="ftype video">\n			',item.video_duration&&(__p+="\n			<span>"+(null==(__t=videoDurationFormat(item.video_duration))?"":_.escape(__t))+"</span>\n			"),__p+="\n		</i>\n	</a>\n</li>\n"}__p+="\n"}return __p},VIDEO_API="/api/article/hot_video/";module.exports=Pagelet.extend({el:"#pagelet-hotvideo",init:function(){this.getVideo()},render:function(t){t.videoDurationFormat=videoDurationFormat,this.$dom.video.html(VIDEO_TMPL(t)),$(this.el).show()},getVideo:function(){if(!this.loading){this.loading=!0;var t={};$.ajax({url:VIDEO_API,type:"GET",dataType:"json",context:this,data:t,success:function(t){this.loading=!1,t=t||{},"success"===t.message&&0!=t.data.length&&this.render(t)},error:function(){this.loading=!1}})}}})});