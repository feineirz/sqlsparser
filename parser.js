export class SqlsParser {
    static aliases = {
        ddb: 'DROP DATABASE IF EXISTS ',
        cdb: 'CREATE DATABASE ',
        dtb: 'DROP TABLE IF EXISTS ',
        ctb: 'CREATE TABLE ',
        atb: 'ALTER TABLE ',
        acl: ' ADD COLUMN ',
        mcl: ' MODIFY COLUMN ',
        bf: ' BEFORE ',
        af: ' AFTER ',
        um: ' utf8mb4 ',
        umgci: ' utf8mb4_general_ci ',
        umgcs: ' utf8mb4_general_cs ',
        dbumgci: 'CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci ',
        dbumgcs: 'CHARACTER SET utf8mb4 COLLATE utf8mb4_general_cs ',
        cs: 'CHARACTER SET ',
        cl: ' COLLATE ',
        csum: 'CHARACTER SET utf8mb4 ',
        clumgci: ' COLLATE utf8mb4_general_ci ',
        u: 'USE ',
        //
        ti: ' TINYINT ',
        tiu: ' TINYINT UNSIGNED ',
        i: ' INT ',
        us: ' UNSIGNED ',
        iu: ' INT UNSIGNED ',
        iunn: ' INT UNSIGNED NOT NULL ',
        iunnun: ' INT UNSIGNED NOT NULL UNIQUE ',
        iudf: ' INT UNSIGNED DEFAULT ',
        iudf0: ' INT UNSIGNED DEFAULT 0 ',
        iudf1: ' INT UNSIGNED DEFAULT 1 ',
        iupk: ' INT UNSIGNED PRIMARY KEY ',
        iuaipk: ' INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ',
        d: ' DECIMAL ',
        dmoney: ' DECIMAL(11, 2) ',
        dbigmoney: ' DECIMAL(21, 2) ',
        dsci: ' DECIMAL(12, 3) ',
        dbigsci: ' DECIMAL(22, 3) ',
        dt: ' DATE ',
        dtt: ' DATETIME ',
        ts: ' TIMESTAMP ',
        c: ' CHAR ',
        vc: ' VARCHAR ',
        nvc: ' NVARCHAR ',
        tx: ' TEXT ',
        ai: ' AUTO_INCREMENT ',
        nn: ' NOT NULL ',
        un: ' UNIQUE ',
        nnun: ' NOT NULL UNIQUE ',
        df: ' DEFAULT ',
        df0: ' DEFAULT 0 ',
        df1: ' DEFAULT 1 ',
        dfes: " DEFAULT '' ",
        dfcts: ' DEFAULT CURRENT_TIMESTAMP ',
        nndf: ' NOT NULL DEFAULT ',
        nndf0: ' NOT NULL DEFAULT 0 ',
        nndf1: ' NOT NULL DEFAULT 1 ',
        nndfes: " NOT NULL DEFAULT '' ",
        cn: ' CONSTRAINT ',
        pk: ' PRIMARY KEY ',
        fk: ' FOREIGN KEY ',
        rf: ' REFERENCES ',
        ours: ' ON UPDATE RESTRICT ',
        odrs: ' ON DELETE RESTRICT ',
        oucc: ' ON UPDATE CASCADE ',
        odcc: ' ON DELETE CASCADE ',
        ousd: ' ON UPDATE SET DEFAULT ',
        odsd: ' ON DELETE SET DEFAULT ',
        ousn: ' ON UPDATE SET NULL ',
        odsn: ' ON DELETE SET NULL ',
        ouna: ' ON UPDATE NO ACTION ',
        odna: ' ON DELETE NO ACTION ',
        //
        ck: ' CHECK ',
        cidx: 'CREATE INDEX ',
        on: ' ON ',
        idx: ' INDEX ',
        ng: ' ENGINE =  ',
        nginno: ' ENGINE = INNODB ',
        cm: ' COMMENT = ',
        //
        sel: ' SELECT ',
        sela: ' SELECT * ',
        fr: ' FROM ',
        selafr: ' SELECT * FROM ',
        jn: ' JOIN ',
        lj: ' LEFT JOIN ',
        rj: ' RIGHT JOIN ',
        ij: ' INNER JOIN ',
        wh: ' WHERE ',
        bw: ' BETWEEN ',
        gb: ' GROUP BY ',
        odb: ' ORDER BY ',
        ins: ' INSERT INTO ',
        val: ' VALUES ',
        ud: ' UPDATE ',
        //
        idaipk: ' id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ',
        urole: " user_role VARCHAR(64) NOT NULL DEFAULT 'User'",
        ulevel: ' user_level TINYINT UNSIGNED DEFAULT 0 ',
        uname: ' username VARCHAR(64) NOT NULL UNIQUE ',
        name: ' name VARCHAR(100) NOT NULL UNIQUE ',
        dname: " display_name VARCHAR(100) DEFAULT 'User' ",
        pwd: ' password VARCHAR(64) NOT NULL ',
        email: ' email VARCHAR(64) NOT NULL UNIQUE ',
        phone: ' phone VARCHAR(100) NOT NULL UNIQUE ',
        fax: ' fax VARCHAR(100) NOT NULL UNIQUE ',
        desc: ' description TEXT ',
        rem: ' remark TEXT ',
        price: ' price DECIMAL(11, 2) NOT NULL ',
        price0: ' price DECIMAL(11, 2) DEFAULT 0 ',
        uprice: ' unitprice DECIMAL(11, 2) NOT NULL ',
        uprice0: ' unitprice DECIMAL(11, 2) DEFAULT 0 ',
        qty: ' quantity INT UNSIGNED NOT NULL ',
        qty0: ' quantity INT UNSIGNED DEFAULT 0 ',
    }

    static delimeter = '-'

    static sortedAliases = Object.keys(this.aliases)
        .sort()
        .reverse()
        .reduce((acc, cur) => {
            acc[cur] = this.aliases[cur]
            return acc
        }, {})

    static parse(sqlsContent) {
        const wordList = sqlsContent.split('-')
        for (let i = 0; i < wordList.length; i++) {
            if (wordList[i].trim().length > 0) {
                if (this.isNumeric(wordList[i])) {
                    wordList[i] = `(${wordList[i]})`
                } else if (Object.keys(this.sortedAliases).includes(wordList[i])) {
                    wordList[i] = this.sortedAliases[wordList[i]]
                }
            }
        }
        let buffer = wordList.join('')
        buffer = buffer
            .replaceAll(/[ ]{1,}/g, ' ')
            .replaceAll(/[ ]{1,}[;]{1,}/g, ';')
            .replaceAll(/[;]{1,}[ ]{1,}/g, ';')
            .replaceAll(/[ ]{1,}[,]/g, ',')
            .replaceAll(/[ ]{1,}[(]/g, '(')
            .replaceAll(/[ ]{1,}[)]/g, ')')
            .replaceAll(/[\n][ ]{1,}/g, '\n')
            .replaceAll(/[\t]{1}[ ]/g, '\t')
        return buffer
    }

    static isNumeric(value) {
        return /^\d+[,]?/.test(value)
    }
}
