function MinMaxAI(horizon,sockRoom) {
    let socket = require('socket.io-client');
    const client = socket.connect(sockRoom);

    this.initiateAI = function() {
        client.on('post',function () {
            client.emit('play','I am here too');
        });


    };

#minimax = 0
#alphabeta = 0
    turns = 0

    function minimax_dfs(game, state, depth, horizon, eval_fn):
    //"""Return (value, action) tuple for minimax search up to the given depth"""
    val = -1*float('inf')
    act = None
    succ, action = game.get_successors(state)
    for ind in range(len(succ)):
    temp = min_value(game, succ[ind], depth, horizon, eval_fn)
    if val<temp:
    val = temp
    act = action[ind]
    //print "Minimax: " + str(minimax)
    return (val, act)
    // Note that eval_fn is a function which has been passed as an argument and
    // you can call it like any other function

    function max_value(game, state, depth, horizon, eval_fn):
#global minimax
    #minimax+=1
    if depth >= horizon or sum(state.cookiecounts)==13:
    global turns
    turns = horizon-depth
    return eval_fn(state)
    ret_num = -1*float('inf')
    succ, actions = game.get_successors(state)
    for s in succ:
    ret_num = max(ret_num, min_value(game, s, (depth+1), horizon, eval_fn))
    return ret_num

    function min_value(game, state, depth, horizon, eval_fn):
//#global minimax
    #minimax += 1
    if depth >= horizon or sum(state.cookiecounts)==13:
    global turns
    turns = horizon-depth
    return eval_fn(state)
    ret_num = float('inf')
    succ, actions = game.get_successors(state)
    for s in succ:
    ret_num = min(ret_num, max_value(game, s, (depth+1), horizon, eval_fn))
    return ret_num

    function alphabeta_dfs(game, state, depth, horizon, eval_fn):
    val = -1 * float('inf')
    act = None
    succ, action = game.get_successors(state)
    for ind in range(len(succ)):
    temp = ab_min(game, succ[ind], depth, horizon, eval_fn, -1 * float('inf'), float('inf'))
    if val < temp:
    val = temp
    act = action[ind]
    #print "AlphaBeta: "+str(alphabeta)
    return (val, act)

    function ab_max(game, state, depth, horizon, evalFunc, alpha, beta) {
//#global alphabeta
        //#alphabeta+=1
        if (depth >= horizon || sum(state.cookiecounts) == 13) {
            return evalFunc(state)
        }
        var retNum = Math.log(0);
        succ, actions = game.get_successors(state)
        for s in succ:
        val = ab_min(game, s, (depth + 1), horizon, eval_fn, alpha, beta)
        if ret_num < val:
        ret_num = val
        if ret_num >= beta:
        return ret_num
        alpha = max(alpha, ret_num)
        return ret_num
    }
    def ab_min(game, state, depth, horizon, eval_fn, alpha, beta):
#global alphabeta
    #alphabeta+=1
    if depth >= horizon or sum(state.cookiecounts)==13:
    global turns
    turns = horizon-depth
    return eval_fn(state)
    ret_num = float('inf')
    succ, actions = game.get_successors(state)
    for s in succ:
    val = ab_max(game, s, (depth+1), horizon, eval_fn, alpha, beta)
    if ret_num>val:
    ret_num=val
    if ret_num <= alpha:
    return ret_num
    beta = min(beta, ret_num)
    return ret_num

    return this;
};

module.exports = function(difficulty,room) {
    var newBot = MinMaxAI(difficulty,room);
    return newBot;
};