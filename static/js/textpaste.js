upload.modules.addmodule({
    name: 'textpaste',
    init: function () {
      $(document).on('submit', '#textview', this.save.bind(this))
      $(document).on('click', '#retbtn', this.closethis.bind(this))
      $(document).on('keypress', this.keypress.bind(this))
    },
    keypress: function(e) {
      if (!this.current || !this.current.is(':visible')) {
        return
      }
      
      if (!(e.which == 115 && (e.ctrlKey || e.metaKey)) && !(e.which == 19)) {
        return
      }

      this.save()
      event.preventDefault()
    },
    save: function(e) {
      e ? e.preventDefault() : undefined
      upload.route.setroute(upload.home)
      upload.home.doupload(new File([this.current.find('textarea').val()],
      this.current.find('#create_filename').val(),
        {
          type: this.current.find('#create_mime').val()
        }
      ))
    },
    cleanup: function() {
      delete this['closeback']
      delete this['current']
    },
    closethis: function() {
      var closeback = this.closeback
      this.current.remove()
      this.cleanup()
      closeback()
    },
    render: function(view, filename, data, mime, closeback) {
      var main = $('<form>').prop('id', 'textview').prop('autocomplete', 'off')

      main.appendTo(view)

      this.closeback = closeback
      this.current = main

      main.append($('<div>').addClass('viewswitcher').append(
        $('<button>').prop('type', 'submit').text('Save').addClass('btn')
      ).append(
        $('<a>').prop('id', 'retbtn').text('Return').addClass('btn')
      ))

      var filenamefield = $('<input>').prop('id', 'create_filename').val(filename)

      var mimefield = $('<input>').prop('hidden', true).prop('id', 'create_mime').val(mime)

      main.append(filenamefield).append(mimefield)

      var area = $('<textarea>')

      var text  = $('<div>').prop('id', 'create_text').addClass('previewtext preview')
        .append($('<div>').prop('id', 'create_linenos').append("&gt;"))
        .append(area)

        main.append(text)


        area.val(data).focus()[0].setSelectionRange(0, 0)

        area.scrollTop(0)
    }
})
