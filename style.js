(function (blink) {
	'use strict';

	var AnayaIndice2020 = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	AnayaIndice2020.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_AnayaIndice2020',
		toolbar: { name: 'editorial', items: ['Blink_wrapper', 'Blink_aside', 'Blink_custom_lists', 'Blink_simple_grid'] },
		extraPlugins: ['image2', 'blink_wrapper', 'blink_aside', 'blink_custom_lists', 'blink_simple_grid'],
		ckEditorStyles: {
			name: 'AnayaIndice2020',
			styles: [
				{ name: 'subtitle', element: 'h4', attributes: { 'class': 'AnayaIndice2020-subtitle'} },
				{ name: 'header', element: 'h6', attributes: { 'class': 'AnayaIndice2020-header'} },
				{ name: 'competencias subtitle', element: 'h6', attributes: { 'class': 'AnayaIndice2020-competencias-subtitle'} },
				{ name: 'ejercicio', element: ['p', 'li'], attributes: { 'class': 'AnayaIndice2020-exercise' } },

				{ name: 'box-center', type: 'widget', widget: 'blink_wrapper', attributes: { 'class': 'center' } },
				{ name: 'aside-right', type: 'widget', widget: 'blink_aside', attributes: { 'class': 'right' } },

				//BK-15873 Quitamos el estilo versalitas, ya que lo hereda de basic

				{ name: 'img-right', element: 'img', attributes: { 'class': 'bck-img right' } },
				{ name: 'img-left', element: 'img', attributes: { 'class': 'bck-img left' } },

				{ name: 'Tabla 1', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'table1' } },
				{ name: 'Tabla 2', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'table2' } },
				{ name: 'Tabla 3', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'table3' } },
				{ name: 'Tabla azul claro', element: 'table', attributes: { 'data-color': 'light-blue' } },
				{ name: 'Tabla azul oscuro', element: 'table', attributes: { 'data-color': 'dark-blue' } },
				{ name: 'Tabla fucsia', element: 'table', attributes: { 'data-color': 'fucsia' } },
				{ name: 'Tabla verde claro', element: 'table', attributes: { 'data-color': 'light-green' } },
				{ name: 'Tabla verde oscuro', element: 'table', attributes: { 'data-color': 'dark-green' } },
				{ name: 'Tabla verde agua', element: 'table', attributes: { 'data-color': 'water-green' } },
				{ name: 'Tabla naranja', element: 'table', attributes: { 'data-color': 'orange' } },
				{ name: 'Tabla roja', element: 'table', attributes: { 'data-color': 'red' } },
				{ name: 'Tabla centrada', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table-center'} },


				{ name: 'Palabra azul claro', element: 'span', attributes: { 'class': 'bck-light-blue' } },
				{ name: 'Palabra fucsia', element: 'span', attributes: { 'class': 'bck-fucsia' } },
				{ name: 'Palabra morada', element: 'span', attributes: { 'class': 'bck-purple' } },
				{ name: 'Palabra roja', element: 'span', attributes: { 'class': 'bck-red' } },
				{ name: 'Palabra verde agua', element: 'span', attributes: { 'class': 'bck-esmerald' } },
				{ name: 'Palabra naranja', element: 'span', attributes: { 'class': 'bck-orange' } }
			]
		},
		slidesTitle: {},

		onLoadImg: function () {

		},

		bindEventsToEditor: function (editor) {
			editor.on('saveSnapshot', function (evt) {
				if (!this.container) return;
				$(this.container.$).find('.image-reduce')
					.each(function (index, element) {
						this.onload && this.onload();
					});
			});
		},

		init: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(this);
			this.addActivityTitle();
			if(window.esWeb) return;
			this.removeFinalSlide();
			this.fillSlidesTitle();
			this.formatCarouselindicators();
		},

		removeFinalSlide: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.removeFinalSlide.call(this, true);
		},

		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html() + ' > ' + blink.courseInfo.unit;
			})
		},

		fillSlidesTitle: function () {
			var self = this.slidesTitle;

			for (var index = 0; index < window.secuencia.length; index++) {
				var slide = window['t'+index+'_slide'];
				var slideTitle = slide.title;

				slideTitle = slideTitle.replace(/<span class="index">\s*([\d]+)\s*<\/span>/i, '$1. ');
				slideTitle = slideTitle.replace(/\s+/, ' ');
				slideTitle = stripHTML(slideTitle);

				self['t'+index+'_slide'] = slideTitle;
			}
		},

		formatCarouselindicators: function () {
			var $navbarBottom = $('.navbar-bottom'),
				$carouselIndicators = $('.slider-indicators').find('li');

			var dropDown = '' +
					'<div class="dropdown">' +
						'<button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">' +
							'Índice' +
							'<span class="caret"></span>' +
						'</button>' +
						'<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">';

			$navbarBottom.find('li').tooltip('destroy');

			var navigatorIndex = 0;
			var navLabel = 0;

			for (var index = 0; index < window.secuencia.length; index++) {
				var slide = eval('t'+index+'_slide'),
					slideTitle = slide.title.replace(/<span class="index">[\d]+<\/span>/g, ''),
					numIndice = (navigatorIndex == 0)?'I':navLabel,
					textIndice = (navigatorIndex == 0) ? 'Introducción' : stripHTML(slideTitle);
				var clase = '';


				if (slide.isConcatenate) continue;

				if (slide.seccion) {

					if(slide.seccion == 'taller')
						clase = ('fa fa-edit');
					else
						clase = ('fa fa-check');
				}

				dropDown += '<li role="presentation"><a role="menuitem"><span class="num '+ (clase ? clase: '')+'" data-title="'+stripHTML(slideTitle)+'">' + (clase ? '': numIndice + '.') + '</span> <span class="title">' + textIndice + '</span></a></li>';
				$navbarBottom.find('li').eq(navigatorIndex).html('<span title="'+ stripHTML(slideTitle) +'" class="'+ (clase ? clase: '')+'">'+(clase ? '': numIndice)+'</span>');

				if (!slide.seccion) {
					navLabel++;
				}

				navigatorIndex++;

			};

			dropDown += '' +
						'</ul>' +
					'</div>';

			$navbarBottom
				.attr('class', 'AnayaIndice2020-navbar')
				.wrapInner('<div class="navbar-content"></div>')
				.find('ol')
					.before(dropDown)
					.wrap('<div id="top-navigator"/>')
					.end()
				.find('.dropdown').find('li')
					.on('click', function (event) {
						$navbarBottom.find('ol').find('li').eq($(this).index()).trigger('click');
					});

			$('.slider-indicators').find('li:eq(0) span').removeClass('fa fa-cog').html('I');

			if (!blink.hasTouch) {
				$navbarBottom
					.find('ol').find('span')
						.tooltip({
							placement: 'bottom',
							container: 'body'
						});
			}

			blink.events.trigger(true, 'style:endFormatCarousel');
		},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	AnayaIndice2020.prototype = _.extend({}, new blink.theme.styles.basic(), AnayaIndice2020.prototype);

	blink.theme.styles['AnayaIndice2020_indice_2020'] = AnayaIndice2020;


})( blink );



//--------------------------------------------//



$(document).ready( function(){
	var editMode = (window.location.href.indexOf("editar=1") > -1);
	if (! editMode ) createAnayaMenu();
});



function createAnayaMenu(){
	$(".libro.content-wrapper #indice").hide();
	loadJSON();
}





function loadJSON(){

	var isBlink = (window.location.href.indexOf("blinklearning.com") > -1);

    if (isBlink){ //online
    	blink.getCourse(window.idcurso).done( drawMenu );
    } else { //local
    	var url = window.location.href.replace("curso2", "curso_json");
    	if(offline){
    		if(url.indexOf("curso_json") > -1){
    			url = removeParams(['idtema' , 'idalumno' ],url);
    		}
    	}
	    $.ajax({
	        url: url,
	        dataType: 'json',
	        beforeSend: function(xhr){ if (xhr.overrideMimeType) xhr.overrideMimeType("application/json"); },
	        success: drawMenu
	    });
	}

}



function drawMenu(json){

	defineLanguage(json.idioma);
    if(esHomeCurso()) createStructure(json); //BK-16261 Comprobamos que este en la home del curso para pintar el TOC
    initListeners();

    smallMode = false;
    $(window).trigger("resize");
}



function defineLanguage(lang){

	var language_strings = {
    	"ES": {
    		"exposicion": "Exposición",
    		"ejercitacion": "Ejercitación",
    		"evaluacion": "Evaluación",
    		"recursos": "Recursos de la unidad",
    		"alumnado": "Alumnado",
    		"profesorado": "Profesorado",
    		"entrar": "Entrar",
    		"indice": "Índice",
    		"propuesta": "Propuesta Didáctica"
    	},
    	"EN": {
    		"exposicion": "Presentation",
    		"ejercitacion": "Practice",
    		"evaluacion": "Evaluation",
    		"recursos": "Unit resources",
    		"alumnado": "Students",
    		"profesorado": "Teachers",
    		"entrar": "Enter",
    		"indice": "Index",
    		"propuesta": "Teacher's Guide"
    	},
    	"GAL": {
    		"exposicion": "Exposición",
    		"ejercitacion": "Exercitación",
    		"evaluacion": "Avaliación",
    		"recursos": "Recursos da unidade",
    		"alumnado": "Alumnado",
    		"profesorado": "Profesorado",
    		"entrar": "Entrar",
    		"indice": "Índice",
    		"propuesta": "Proposta Didáctica"
    	},
    	"EUS": {
    		"exposicion": "Azalpena",
    		"ejercitacion": "Trebakuntza",
    		"evaluacion": "Ebaluazioa",
    		"recursos": "Unitateko baliabideak",
    		"alumnado": "Ikasleak",
    		"profesorado": "Irakasleak",
    		"entrar": "Sartu",
    		"indice": "Aurkibidea",
    		"propuesta": "Proposamen didaktikoa"
    	},
    	"VAL": {
    		"exposicion": "Exposició",
    		"ejercitacion": "Exercitació",
    		"evaluacion": "Avaluació",
    		"recursos": "Recursos de la unitat",
    		"alumnado": "Alumnat",
    		"profesorado": "Professorat",
    		"entrar": "Entrar",
    		"indice": "Índex",
    		"propuesta": "Proposta Didàctica"
    	},
    	"BAL": {
    		"exposicion": "Exposició",
    		"ejercitacion": "Exercitació",
    		"evaluacion": "Avaluació",
    		"recursos": "Recursos de la unitat",
    		"alumnado": "Alumnat",
    		"profesorado": "Professorat",
    		"entrar": "Entrar",
    		"indice": "Índex",
    		"propuesta": "Proposta Didàctica"
    	},
    	"FR": {
    		"exposicion": "Présentation",
    		"ejercitacion": "Exercice",
    		"evaluacion": "Evaluation ",
    		"recursos": "Ressources de l’unité",
    		"alumnado": "Elèves",
    		"profesorado": "Enseignants",
    		"entrar": "Voir",
    		"indice": "Index",
    		"propuesta": "Proposition Didactique"
    	}
    };

    var language = lang || "ES";
    es_strings = language_strings["ES"];
    loc_strings = language_strings[language.toUpperCase()] || es_strings;

	var ls_visited_activities = localStorage.getItem("visited_activities");
	visited_activities = (ls_visited_activities == null) ? [] : ls_visited_activities.split(",");

}



function createStructure(json){

	_aU = {};
	_aU.number_shift = 0;

    var a_indice='\
    	<div id="a_indice"> \
			<div class="index_container"> \
				<div class="tablet_button"></div> \
				<ul id="index_units_list"></ul> \
			</div> \
			<div class="units_container"></div> \
    	</div>';

    $(".libro.content-wrapper").prepend(a_indice);
    $(".libro.content-wrapper #indice").hide();
    $(".footer .language").hide();


    $.each(json.units, function(i, unit){
    	addUnits(unit);
    });

}


function addUnits(unit){

	_aU.unit = unit;

    _aU.title = unit.title.replace(/\{.\}/,"");
    _aU.title_won = _aU.title.replace(/^\d\d?\. /,"");

    _aU.isPd = ( _aU.title.toLowerCase().indexOf(loc_strings.propuesta.toLowerCase()) > -1 || _aU.title.toLowerCase().indexOf(es_strings.propuesta.toLowerCase()) > -1) ? true : false;
    _aU.isIndex = ( _aU.title.toLowerCase() == loc_strings.indice.toLowerCase() || _aU.title.toLowerCase() == es_strings.indice.toLowerCase()) ? true : false;

    _aU.isAppendix = (_aU.unit.title.indexOf("{a}") > -1);
    _aU.classAppendix = (_aU.isAppendix) ? "appendix" : "";


    if (_aU.isIndex || _aU.isAppendix || _aU.isPd) _aU.number_shift++;

    _aU.id = unit.id;
    _aU.image = unit.image;
    _aU.number = unit.number-_aU.number_shift;
    _aU.titleMain = (_aU.isPd || _aU.isIndex || _aU.isAppendix) ? _aU.title_won : _aU.number+'. '+_aU.title_won;
    _aU.class_indice = (_aU.isIndex) ? "indice" : "";
    _aU.class_pd = (_aU.isPd) ? "pd" : "";
    _aU.active = (unit.number == 1) ? "active" : "";
	_aU.hidden = (unit.number > 1) ? "hidden" : "";
	_aU.disabled = (unit.subunits.length == 0) ? "disabled" : "";


    addUnitToColUnits();
    addUnitToColMain();

}



function addUnitToColUnits(){

    var unit_element = "";

    unit_element += '<li data-id="'+_aU.id+'" class="litema '+_aU.disabled+' '+_aU.class_indice+' '+_aU.class_pd+' '+_aU.active+' '+_aU.classAppendix+'">';
    unit_element += '<div class="number '+_aU.class_indice+' '+_aU.class_pd+' '+_aU.classAppendix+'">'+_aU.number+'</div>';
    unit_element += '<div class="title_background"></div>';
    unit_element += '<div class="title '+_aU.class_indice+' '+_aU.class_pd+' '+_aU.classAppendix+'"><div class="title_text">'+_aU.title_won+'</div></div>';
    unit_element += '</li>';

    $("#a_indice #index_units_list").append(unit_element);

}



function addUnitToColMain(){

    var main_element = "";

    main_element += '<div class="a_unit-content" data-id="'+_aU.id+'" '+_aU.hidden+'>';

    //header
    main_element += '<div class="header">';
    main_element += '<span class="title">'+_aU.titleMain+'</span>';
    main_element += '<div class="unit-image" style="background-image: url(\''+_aU.image+'\');"></div>';
    main_element += '<div class="enter-book">'+loc_strings.entrar+'</div>';
    main_element += '</div>';

    //content
    main_element += '<div class="content">';
    main_element += '<div class="activities">';

    main_element += '<div class="resources_header">'+loc_strings.recursos+'<div class="legend"><div class="icon evaluacion">'+loc_strings.evaluacion+'</div><div class="icon exposicion">'+loc_strings.exposicion+'</div><div class="icon ejercitacion">'+loc_strings.ejercitacion+'</div></div></div>';

    //activities
    main_element += '<ul class="activities_list"><div class="alumprof_labels">';

    if ( ! blink.user.esAlumno() && ! blink.user.esPadre() ) main_element += '<div class="alum label">'+loc_strings.alumnado+'</div><div class="prof label">'+loc_strings.profesorado+'</div>';
    main_element += '</div>';


    var arrAct = _aU.unit.subunits.concat(_aU.unit.resources);

    $.each(arrAct, function(i, activity){

        if (activity.type == "libro") return;

        var isNotTeacher = ( blink.user.esAlumno() || blink.user.esPadre() || blink.user.esAnonimo() );
        if (activity.isOnlyVisibleTeachers == 1 && isNotTeacher ) return;

        var only_teachers = (activity.isOnlyVisibleTeachers == 1) ? "only_teachers" : "";

        var id=activity.id;

        var title_split = activity.title.split("{");
        var description_split = activity.description.split("{");

        var title = title_split[0];
        var description = description_split[0];

        var tipo = "";
        var cod = "";

        if (title_split.length > 1) var cod = title_split[1].charAt(0);
        if (description_split.length > 1) var cod = description_split[1].charAt(0);

        if (cod == "v") tipo = "evaluacion";
        if (cod == "x") tipo = "exposicion";
        if (cod == "j") tipo = "ejercitacion";


		var grade = "";
		var grade_hide = "display_none";
		var visited = "";

		var alum = (blink.user.esAlumno() || blink.user.esPadre()) ? "alum" : "";

		inActividades = (typeof actividades != "undefined" && typeof actividades[id] != "undefined");
		inLS = visited_activities.indexOf(id) > -1;

        if ( inActividades || inLS ) {
    		visited = "visited";
    		if (inActividades) grade = actividades[id].nota || "";
    		if (grade != "") grade_hide = "";
        }


        main_element += '<li class="item '+only_teachers+' '+alum+' '+visited+'" data-id="'+id+'">';

        main_element += '<span class="icon '+tipo+' off js-state"></span>';
        main_element += '<span class="title">'+title+'</span>';

        main_element += '<span class="grade '+grade_hide+'">'+grade+'</span>';
        main_element += '<span class="text">'+description+'</span>';
        main_element += '</li>';

    });


    main_element += '</ul></div></div>';

    $("#a_indice .units_container").append(main_element);


    if ( $('#a_indice .a_unit-content[data-id='+_aU.id+'] li').length == 0 ) $('#a_indice .a_unit-content[data-id='+_aU.id+'] .activities').empty();


    //listeners
    $.each(_aU.unit.subunits, function(i, activity){

        if (activity.type == "libro" ){
            $('#a_indice .a_unit-content[data-id='+_aU.id+']').find(".enter-book").on("tap", function(){
                eval(activity.onclickTitle);
            });
        } else {
	        $('#a_indice .item[data-id="'+activity.id+'"]').find('.title').on("tap", function(){
                $(this).parent().addClass("visited");
                saveVisitedLocalStorage(activity.id);
                eval(activity.onclickTitle);
	        });
	    }
    });


    $.each(_aU.unit.resources, function(i, activity){

        $('#a_indice .item[data-id="'+activity.id+'"]').find('.title').on("tap", function(){
        	$(this).parent().addClass("visited");
            saveVisitedLocalStorage(activity.id);
            eval(activity.onclickTitle);
        });
    });

}



function initListeners(){

    $("#a_indice .litema:not(.disabled)").on("tap", function(){

        if (smallMode) $(".tablet_button").trigger("tap");

        if (! $(this).hasClass("active") ) $('.units_container .a_unit-content').fadeOut(200);
        $("#a_indice .litema").removeClass("active");
        $(this).addClass("active");

        var id = $(this).data("id");
        setTimeout( function(){
            $('.units_container .a_unit-content[data-id='+id+']').addClass("active").fadeIn(200);
        }, 200);

    })


    $(window).on("resize", function(){

        if  ( $(window).width() < 960 && ! smallMode ) {
            smallMode = true;
            $(".index_container").addClass("hiddenLeft");
            $(".tablet_button").removeClass("close_mode").show();
        }

        if ( $(window).width() > 960 ) {
            smallMode = false;
            $(".index_container").removeClass("hiddenLeft");
            $(".tablet_button").hide();
        }

    })


    $(".tablet_button").on("tap", function(){
        $(".index_container").toggleClass("hiddenLeft");
        $(".tablet_button").toggleClass("close_mode");
        $("body,html").animate({ scrollTop: 0}, 400);
    });

}



function saveVisitedLocalStorage(id){
	visited_activities.push(id);
	localStorage.setItem( "visited_activities", visited_activities.join() );
}
