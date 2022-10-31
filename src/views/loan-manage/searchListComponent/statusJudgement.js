const statusJudgment = (status) => {
    switch (status) {
        case 0://进件状态
            return '进件状态'
        case 1:
            return '提交初审'
        case 2:
            return '初审通过'
        case 3:
            return '初审拒绝'
        case 4:
            return '提交终审'
        case 5:
            return '终审通过'
        case 6:
            return '终审拒绝'
        case 7:
            return '生成合同'
    }
}

export default statusJudgment