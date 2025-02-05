taskQueue.utils.formatDate = function (string) {
    if (string && string != '0000-00-00 00:00:00' && string != '-1-11-30 00:00:00' && string != 0) {
        var date = /^[0-9]+$/.test(string)
            ? new Date(string * 1000)
            : new Date(string.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1'));

        return date.strftime(MODx.config['ms2_date_format']);
    } else {
        return '&nbsp;';
    }
};

taskQueue.utils.renderBoolean = function (value) {
    return value
        ? String.format('<span class="green">{0}</span>', _('yes'))
        : String.format('<span class="red">{0}</span>', _('no'));
};

taskQueue.utils.renderParserFieldType = function (value) {
    if(value == 1){
        return String.format('<span class="taskqueue_badge taskqueue_badge_blue">{0}</span>', _('taskqueue_parser_config_fields_type_1'))
    }
    if(value == 2){
        return String.format('<span class="taskqueue_badge taskqueue_badge_green">{0}</span>', _('taskqueue_parser_config_fields_type_2'))
    }
};

taskQueue.utils.renderParserFieldSource = function (value) {
    if(value == 'field'){
        return String.format('<span class="taskqueue_badge taskqueue_badge_black">{0}</span>', _('taskqueue_parser_config_fields_source_field'))
    }
    if(value == 'attribute'){
        return String.format('<span class="taskqueue_badge taskqueue_badge_brown">{0}</span>', _('taskqueue_parser_config_fields_source_attribute'))
    }
    if(value == 'withhtml'){
        return String.format('<span class="taskqueue_badge taskqueue_badge_grey">{0}</span>', _('taskqueue_parser_config_fields_source_withhtml'))
    }
    if(value == 'css'){
        return String.format('<span class="taskqueue_badge taskqueue_badge_brown_2">{0}</span>', _('taskqueue_parser_config_fields_source_css'))
    }
    if(value == 'table'){
        return String.format('<span class="taskqueue_badge taskqueue_badge_grey_2">{0}</span>', _('taskqueue_parser_config_fields_source_table'))
    }
    if(value == 'tables'){
        return String.format('<span class="taskqueue_badge taskqueue_badge_green">{0}</span>', _('taskqueue_parser_config_fields_source_tables'))
    }
};

taskQueue.utils.renderFieldType = function (value) {
    if(value == 1){
        return 'Поле отчета'
    }
    if(value == 2){
        return 'Параметр'
    }
};

taskQueue.utils.renderFieldParamType = function (value) {
    if(value == 1){
        return 'Текстовое поле'
    }
    if(value == 2){
        return 'Выбор цены'
    }
    if(value == 3){
        return 'Да/Нет'
    }
    if(value == 4){
        return 'Число'
    }
};

taskQueue.utils.getMenu = function (actions, grid, selected) {
    var menu = [];
    var cls, icon, title, action;

    var has_delete = false;
    for (var i in actions) {
        if (!actions.hasOwnProperty(i)) {
            continue;
        }

        var a = actions[i];
        if (!a['menu']) {
            if (a == '-') {
                menu.push('-');
            }
            continue;
        }
        else if (menu.length > 0 && !has_delete && (/^remove/i.test(a['action']) || /^delete/i.test(a['action']))) {
            menu.push('-');
            has_delete = true;
        }

        if (selected.length > 1) {
            if (!a['multiple']) {
                continue;
            }
            else if (typeof(a['multiple']) == 'string') {
                a['title'] = a['multiple'];
            }
        }

        icon = a['icon'] ? a['icon'] : '';
        if (typeof(a['cls']) == 'object') {
            if (typeof(a['cls']['menu']) != 'undefined') {
                icon += ' ' + a['cls']['menu'];
            }
        }
        else {
            cls = a['cls'] ? a['cls'] : '';
        }
        title = a['title'] ? a['title'] : a['title'];
        action = a['action'] ? grid[a['action']] : '';

        menu.push({
            handler: action,
            text: String.format(
                '<span class="{0}"><i class="x-menu-item-icon {1}"></i>{2}</span>',
                cls, icon, title
            ),
            scope: grid
        });
    }

    return menu;
};

taskQueue.utils.renderBonus = function (value, props, row) {
    var res = [];
    var cls, icon, title, action, item;
    for (var i in row.data.actions) {
        if (!row.data.actions.hasOwnProperty(i)) {
            continue;
        }
        var a = row.data.actions[i];
        if (!a['button']) {
            continue;
        }

        icon = a['icon'] ? a['icon'] : '';
        if (typeof(a['cls']) == 'object') {
            if (typeof(a['cls']['button']) != 'undefined') {
                icon += ' ' + a['cls']['button'];
            }
        }
        else {
            cls = a['cls'] ? a['cls'] : '';
        }
        action = a['action'] ? a['action'] : '';
        title = a['title'] ? a['title'] : '';

        item = String.format(
            '<li class="{0}"><button class="taskqueue-btn taskqueue-btn-default {1}" action="{2}" title="{3}"></button></li>',
            cls, icon, action, title
        );

        res.push(item);
    }

    return String.format(
        '<ul class="taskqueue-row-actions">{0}</ul>',
        res.join('')
    );
};


taskQueue.utils.renderActions = function (value, props, row) {
    var res = [];
    var cls, icon, title, action, item;
    for (var i in row.data.actions) {
        if (!row.data.actions.hasOwnProperty(i)) {
            continue;
        }
        var a = row.data.actions[i];
        if (!a['button']) {
            continue;
        }

        icon = a['icon'] ? a['icon'] : '';
        if (typeof(a['cls']) == 'object') {
            if (typeof(a['cls']['button']) != 'undefined') {
                icon += ' ' + a['cls']['button'];
            }
        }
        else {
            cls = a['cls'] ? a['cls'] : '';
        }
        action = a['action'] ? a['action'] : '';
        title = a['title'] ? a['title'] : '';

        item = String.format(
            '<li class="{0}"><button class="taskqueue-btn taskqueue-btn-default {1}" action="{2}" title="{3}"></button></li>',
            cls, icon, action, title
        );

        res.push(item);
    }

    return String.format(
        '<ul class="taskqueue-row-actions">{0}</ul>',
        res.join('')
    );
};

taskQueue.utils.userLink = function (value, id, blank) {
    if (!value) {
        return '';
    } else if (!id) {
        return value;
    }

    return String.format(
        '<a href="?a=security/user/update&id={0}" class="sl-link" target="{1}">{2}</a>',
        id,
        (blank ? '_blank' : '_self'),
        value
    );
};

taskQueue.utils.productLink = function (value, id, blank) {
    if (!value) {
        return '';
    } else if (!id) {
        return value;
    }

    return String.format(
        '<a href="index.php?a=resource/update&id={0}" class="ms2-link" target="{1}">{2}</a>',
        id,
        (blank ? '_blank' : '_self'),
        value
    );
};

taskQueue.utils.renderImage = function (value) {
    if (Ext.isEmpty(value)) {
        value = taskQueue.config['default_thumb'];
    } else {
        if (!/\/\//.test(value)) {
            if (!/^\//.test(value)) {
                value = '/' + value;
            }
        }
    }

    return String.format('<img src="{0}" />', value);
};

taskQueue.utils.renderBadge = function (value, cell, row) {
    var color = row.data.color || 'CACACA',
        textColor = '000000';

    if (row.data.color) {
        // HEX to RGB
        var r = g = b = 0;
        r = '0x' + color[0] + color[1];
        g = '0x' + color[2] + color[3];
        b = '0x' + color[4] + color[5];

        r /= 255;
        g /= 255;
        b /= 255;

        // RGB to HEX
        var cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = s = l = 0;

        if (delta == 0) {
            h = 0;
        } else if (cmax == r) {
            h = ((g - b) / delta) % 6;
        } else if (cmax == g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);

        if (h < 0) {
            h += 360;
        }

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        textColor = l > 50 ? '000000' : 'FFFFFF';
    }


    //noinspection CssInvalidPropertyValue
    return row.data.hasOwnProperty('active') && !row.data.active
        ? value
        : String.format('<span class="taskqueue-row-badge" style="background-color:#{0};color:#{1}">{2}</span>', color, textColor, value);
};


taskQueue.utils.renderBadgems2  = function (value, cell, row) {
    var color = row.data.ms2status_color || 'CACACA',
        textColor = '000000';

    if (row.data.ms2status_color) {
        // HEX to RGB
        var r = g = b = 0;
        r = '0x' + color[0] + color[1];
        g = '0x' + color[2] + color[3];
        b = '0x' + color[4] + color[5];

        r /= 255;
        g /= 255;
        b /= 255;

        // RGB to HEX
        var cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = s = l = 0;

        if (delta == 0) {
            h = 0;
        } else if (cmax == r) {
            h = ((g - b) / delta) % 6;
        } else if (cmax == g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);

        if (h < 0) {
            h += 360;
        }

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        textColor = l > 50 ? '000000' : 'FFFFFF';
    }


    //noinspection CssInvalidPropertyValue
    return row.data.hasOwnProperty('active') && !row.data.active
        ? value
        : String.format('<span class="taskqueue-row-badge" style="background-color:#{0};color:#{1}">{2}</span>', color, textColor, row.data.ms2status_name);
};

taskQueue.utils.genRegExpString = function (str) {
    var str_new = str;

    var words = {};
    words['0-9'] = '0123456789';
    words['a-z'] = 'qwertyuiopasdfghjklzxcvbnm';
    words['A-Z'] = 'QWERTYUIOPASDFGHJKLZXCVBNM';

    var match = /\/((\(?\[[^\]]+\](\{[0-9-]+\})*?\)?[^\[\(]*?)+)\//.exec(str);
    if (match != null) {
        str_new = match[1].replace(/\(?(\[[^\]]+\])(\{[0-9-]+\})\)?/g, regexpReplace1);
        str_new = str.replace(match[0], str_new);
    }

    return str_new;

    function rand(min, max) {
        if (max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        else {
            return Math.floor(Math.random() * (min + 1));
        }
    }

    function regexpReplace1(match, symbs, count) {
        symbs = (symbs + count).replace(/\[([0-9a-zA-Z-]+)\]\{([0-9]+-[0-9]+|[0-9]+)\}/g, regexpReplace2);

        return symbs;
    }

    function regexpReplace2(match, symbs, count) {
        var r = match;
        var arr_symbs = symbs.match(/[0-9a-zA-Z]-[0-9a-zA-Z]/g);

        if (arr_symbs.length > 0) {
            var maxcount = 1;

            if (typeof count != 'undefined') {
                nums = count.split('-');

                if (typeof nums[1] == 'undefined') {
                    maxcount = +nums[0];
                }
                else {
                    min = +nums[0];
                    max = +nums[1];

                    maxcount = rand(min, max);
                    maxcount = maxcount < min ? min : maxcount;
                }
            }

            for (var i = 0; i < arr_symbs.length; i++) {
                symbs = symbs.replace(arr_symbs[i], words[arr_symbs[i]]);
            }

            var maxpos = symbs.length - 1,
                pos,
                r = '';

            for (var i = 0; i < maxcount; i++) {
                pos = Math.floor(Math.random() * maxpos);
                r += symbs[pos];
            }
        }

        return r;
    }
}
taskQueue.utils.Hash = {
    get: function () {
        var vars = {}, hash, splitter, hashes;
        if (!this.oldbrowser()) {
            var pos = window.location.href.indexOf('?');
            hashes = (pos != -1) ? decodeURIComponent(window.location.href.substr(pos + 1)) : '';
            splitter = '&';
        } else {
            hashes = decodeURIComponent(window.location.hash.substr(1));
            splitter = '/';
        }

        if (hashes.length == 0) {
            return vars;
        } else {
            hashes = hashes.split(splitter);
        }

        for (var i in hashes) {
            if (hashes.hasOwnProperty(i)) {
                hash = hashes[i].split('=');
                if (typeof hash[1] == 'undefined') {
                    vars['anchor'] = hash[0];
                } else {
                    vars[hash[0]] = hash[1];
                }
            }
        }
        return vars;
    },

    set: function (vars) {
        var hash = '';
        for (var i in vars) {
            if (vars.hasOwnProperty(i)) {
                hash += '&' + i + '=' + vars[i];
            }
        }

        if (!this.oldbrowser()) {
            if (hash.length != 0) {
                hash = '?' + hash.substr(1);
            }
            window.history.pushState(hash, '', document.location.pathname + hash);
        } else {
            window.location.hash = hash.substr(1);
        }
    },

    add: function (key, val) {
        var hash = this.get();
        hash[key] = val;
        this.set(hash);
    },

    remove: function (key) {
        var hash = this.get();
        delete hash[key];
        this.set(hash);
    },

    clear: function () {
        this.set({});
    },

    oldbrowser: function () {
        return !(window.history && history.pushState);
    },
};