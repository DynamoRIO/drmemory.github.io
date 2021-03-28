---
layout: null
---
/*
Based on code from CloudCannon:

The MIT License (MIT)

Copyright (c) 2016 CloudCannon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function() {
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1),
      vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return pair[1];
      }
    }
  }

  function getPreview(query, content, previewLength) {
    previewLength = previewLength || (content.length * 2);

    var parts = query.split(' '),
      match = content.toLowerCase().indexOf(query.toLowerCase()),
      matchLength = query.length,
      preview;

    // Find a relevant location in content
    for (var i = 0; i < parts.length; i++) {
      if (match >= 0) {
        break;
      }

      match = content.toLowerCase().indexOf(parts[i].toLowerCase());
      matchLength = parts[i].length;
    }

    // Create preview
    if (match >= 0) {
      var start = match - (previewLength / 2),
        end = start > 0 ? match + matchLength + (previewLength / 2) : previewLength;

      preview = content.substring(start, end).trim();

      if (start > 0) {
        preview = '...' + preview;
      }

      if (end < content.length) {
        preview = preview + '...';
      }

      // Highlight query parts
      preview = preview.replace(new RegExp('(' + parts.join('|') + ')', 'gi'), "<strong>$1</strong>");
    } else {
      // Use start of content if no match found
      preview = content.substring(0, previewLength).trim() + (content.length > previewLength ? '...' : '');
    }

    return preview;
  }

  var search_index = lunr(function () {
    this.ref('name');
    this.field('title', {boost: 10});
    this.field('content');
    for (var key in window.data) {
      this.add(window.data[key]);
    }
  });

  function displaySearchResults(results, query) {
    var searchResultsEl = document.getElementById('search-results'),
      searchProcessEl = document.getElementById('search-process');

    if (results.length) {
      var resultsHTML = '';
      results.forEach(function (result) {
        var item = window.data[result.ref],
          contentPreview = getPreview(query, item.content, 170),
          titlePreview = getPreview(query, item.title);

        resultsHTML += "<li><h4><a href='" + item.url.trim() + "'>" + titlePreview + "</a></h4><p><small>" + contentPreview + "</small></p></li>";
      });

      searchResultsEl.innerHTML = resultsHTML;
      searchProcessEl.innerText = 'Showing';
    } else {
      searchResultsEl.style.display = 'none';
      searchProcessEl.innerText = 'No';
    }
  }

  var query = decodeURIComponent((getQueryVariable('query') || '').replace(/\+/g, "%20")),
    searchQueryContainerEl = document.getElementById('search-query-container'),
    searchQueryEl = document.getElementById('search-query'),
    searchInputEl = document.getElementById('search-input');

  searchInputEl.value = query;
  searchQueryEl.innerText = query;
  searchQueryContainerEl.style.display = 'inline';

  displaySearchResults(search_index.search(query), query);
})();
