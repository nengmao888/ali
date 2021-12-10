// var that;
class Tab {
    constructor(id) {
        // get element
        // that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        // li's father element
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        // section's farther element
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        this.updateNode();
        // Initializes the operation, to bind events to related elements
        this.add.onclick = this.addTab.bind(this.add, this);
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this);
            this.remove[i].onclick = this.removeTab.bind(this.remove[i], this);
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab; 
        }
    }
    // get all of li and section // Because we are adding elements dynamically, we need to retrieve the corresponding elements.
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child')
    }
    // 1,toggle function
    toggleTab(that) {
        // console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    // Clear all li and Section classes
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2,add function
    addTab(that) {
        that.clearClass();
        // 1. Create the Li element and section element
        var random = Math.random();
        var li = '<li class="liactive"><span>new test 1</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">test ' + random + '</section>';
        // 2. Append the two elements to the corresponding parent element  
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    // 3,remove function
    removeTab(that, e) {
        e.stopPropagation();//Prevents bubbling, preventing the trigger of li's toggle click event
        var index = this.parentNode.index;
        console.log(index);
        // Delete li and secton based on index number  The remove() method removes the specified element directly
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // When we delete a non-selected li, the original selected li remains unchanged
        if (document.querySelector('.liactive')) return;
        // When we delete the selected li, let the previous li be selected,
        index--;
        // Manually invoke click events without mouse trigger
        that.lis[index] && that.lis[index].click();
    }
    // 4,edit function
    editTab() {
        var str = this.innerHTML;
        // Double-click to disallow the selected text
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // alert(test);
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select();// The text inside the text box is selected
        // When we leave the textbox we give the value inside the textbox to span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        };
        // Press Enter to assign the values in the text box to span
        input.onkeyup = function (e) {
            if(e.keyCode === 13){
                // Manually calling the form out-of-focus event does not require a mouse-off operation
                this.onblur();
            }
        }
    }
}
new Tab('#tab');