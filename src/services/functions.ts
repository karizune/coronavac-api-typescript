function imc(peso: number, altura: number) {
    return peso / (altura * altura);
}

function classificacao(vlrIMC: number) {
    let classification: string = ''
    if (vlrIMC < 18.5) {
        classification = "Peso baixo"
    }
    else if (vlrIMC >= 18.5 && vlrIMC < 24.9) {
        classification = "Peso normal"
    }
    else if (vlrIMC >= 25.0 && vlrIMC < 29.9) {
        classification = "Sobrepeso"
    }
    else if (vlrIMC >= 30.0 && vlrIMC < 34.9) {
        classification = "Obesidade de primeiro grau"
    }
    else if (vlrIMC >= 35.0 && vlrIMC < 39.9) {
        classification = "Obesidade severa de segundo grau"
    }
    else if (vlrIMC >= 40.0) {
        classification = "Obesidade severa de terceiro grau"
    }
    return classification
}

export = {
    imc, classificacao
}