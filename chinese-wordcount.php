<?php

/*
  Plugin Name: Chinese Word Count
  Plugin URI: http://wordpress.org/extend/plugins/chinese-word-count/
  Description: 写文章的时候，WordPress 2.6的字数统计好像不怎么正确，不支持中文，使用这个插件来修正。
  Author: Charles Tang
  Version: 14.4.19
  Author URI: http://sexywp.com
 */

/*
  Copyright 2008  Charles Tang  (email : charlestang@foxmail.com)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

function replace_wordcount_algorithm() {
    $js_path = WP_CONTENT_URL . '/plugins/chinese-word-count/word-count.js';
    wp_deregister_script('word-count');
    wp_register_script('word-count', $js_path);
	wp_localize_script( 'word-count', 'wordCountL10n', array(
		'count' => __('Word count: %d')
	));
}

add_action('wp_default_scripts', 'replace_wordcount_algorithm', 99);